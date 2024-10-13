import grpc
from concurrent import futures
import report_pb2
import report_pb2_grpc
from models.report import Report

class ReportService(report_pb2_grpc.ReportServiceServicer):
    def CreateReport(self, request, context):
        report = Report(name=request.name, layout=request.layout)
        report.save()
        return report_pb2.Report(id=str(report.id), name=report.name, layout=report.layout)

    def GetReport(self, request, context):
        report = Report.objects.get(id=request.id)
        return report_pb2.Report(id=str(report.id), name=report.name, layout=report.layout)

    def ListReports(self, request, context):
        reports = Report.objects.all()
        return report_pb2.ListReportsResponse(
            reports=[report_pb2.Report(id=str(report.id), name=report.name, layout=report.layout)
                     for report in reports]
        )

    def UpdateReport(self, request, context):
        report = Report.objects.get(id=request.id)
        report.name = request.name
        report.layout = request.layout
        report.save()
        return report_pb2.Report(id=str(report.id), name=report.name, layout=report.layout)

    def DeleteReport(self, request, context):
        report = Report.objects.get(id=request.id)
        report.delete()
        return report_pb2.DeleteReportResponse(success=True)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    report_pb2_grpc.add_ReportServiceServicer_to_server(ReportService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()