'use client';

import React, { useState, useRef } from 'react';

type ElementType = 'text' | 'image' | 'table' | 'graph';

interface ReportElement {
  id: string;
  type: ElementType;
  content: string;
}

const ReportBuilder: React.FC = () => {
    const [elements, setElements] = useState<report_pb.ReportElement[]>([]);
    const [textValue, setTextValue] = useState(''); // State for text content
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);
  
    const grpcClient = useRef<report_pb2_grpc.ReportServiceClient | null>(null);
  
    useEffect(() => {
      // Initialize gRPC client on component mount
      grpcClient.current = new report_pb2_grpc.ReportServiceClient(
        'http://localhost:50051', // Replace with your backend gRPC server address
        grpcWeb.GrpcWebTextTransport.withGrpcWebWrapper()
      );
    }, []);
  
    const addElement = (type: ElementType) => {
      setTextValue(''); // Clear text before adding new element
      const newElement: report_pb.ReportElement = { id: `element-${Date.now()}`, type, content: '' };
      setElements([...elements, newElement]);
    };
  
    const fetchReports = async () => {
      const request = new report_pb2.ListReportsRequest();
      const response = await grpcClient.current!.ListReports(request, null); // Call ListReports
      setElements(response.getReports().map((report) => ({
        id: report.getId(),
        type: 'text', // Set a default type for now (modify based on actual data)
        content: report.getLayout(), // Use layout for content for now
      })));
    };
  
    const onDragStart = (index: number) => {
      dragItem.current = index;
    };
  
    const onDragEnter = (index: number) => {
      dragOverItem.current = index;
    };
  
    const onDragEnd   
   = () => {
      if (dragItem.current !== null && dragOverItem.current !== null) {
        const newElements = [...elements];
        const draggedItem = newElements[dragItem.current];
        newElements.splice(dragItem.current, 1);
        newElements.splice(dragOverItem.current, 0, draggedItem);
        setElements(newElements);
      }
      dragItem.current = null;
      dragOverItem.current = null;
    };
  
    const renderElement = (element: ReportElement) => {
      switch (element.type) {
        case 'text':
          return <div className="bg-blue-100 p-2">Text: {element.content || 'Empty text'}</div>;
        case 'image':
          return <div className="bg-green-100 p-2">Image: {element.content || 'No image URL'}</div>;
        case 'table':
          return <div className="bg-yellow-100 p-2">Table: {element.content || 'Empty table'}</div>;
        case 'graph':
          return <div className="bg-purple-100 p-2">Graph: {element.content || 'No graph data'}</div>;
        default:
          return null;
      }
    };
  
    useEffect(() => {
      // Fetch reports on component mount
      fetchReports();
    }, []);
  
    return (
      <div>
        <div className="mb-4">
          <button className="mr-2 px-2 py-1 bg-blue-500 text-white rounded" onClick={() => addElement('text')}>Add Text</button>
          <button className="mr-2 px-2 py-1 bg-green-500 text-white rounded" onClick={() => addElement('image')}>Add Image</button>
          <button className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded" onClick={() => addElement('table')}>Add Table</button>
          <button className="mr-2 px-2 py-1 bg-purple-500 text-white rounded" onClick={() => addElement('graph')}>Add Graph</button>
        </div>
        <div className="border border-gray-300 p-4 min-h-[200px]">
          {elements.map((element, index) => (
            <div
              key={element.id}
              draggable
              onDragStart={() => onDragStart(index)}
              onDragEnter={() => onDragEnter(index)}
              onDragEnd={onDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className="mb-2 cursor-move"
            >
              {renderElement(element)}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ReportBuilder;