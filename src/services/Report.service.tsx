import axios from "axios";
import { environment } from "../environments/environment";

export default class reportService {
  static generateReport(reportType: string, body: {id: number, initDate: string, finalDate: string}) {
    return axios
      .post(`${environment.reportsUri}/reports/${reportType}`, body, { responseType: "blob" })
      .then((response) => {
        const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `${reportType}.pdf`; 
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => {
        throw new Error(`Error al generar el reporte: ${error.message}`);
      });
  }
}
