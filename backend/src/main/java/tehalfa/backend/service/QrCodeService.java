package tehalfa.backend.service;

import com.google.zxing.*;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.stereotype.Service;

import java.nio.file.FileSystems;
import java.nio.file.Path;

@Service
public class QrCodeService {

    public String generateQr(Long ticketId) throws Exception {

        String data = "TICKET-" + ticketId;

        String path = "tickets/" + ticketId + ".png";

        QRCodeWriter writer = new QRCodeWriter();

        BitMatrix matrix =
                writer.encode(data, BarcodeFormat.QR_CODE, 250, 250);

        Path filePath = FileSystems.getDefault().getPath(path);

        MatrixToImageWriter.writeToPath(matrix, "PNG", filePath);

        return path;
    }
}