package tehalfa.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import java.io.*;

import tehalfa.backend.service.PdfService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/report")
public class AdminReportController {

    private final PdfService service;

    @GetMapping("/{eventId}")
    public ResponseEntity<byte[]> download(
            @PathVariable Long eventId)
            throws Exception {

        ByteArrayInputStream pdf =
                service.generate(eventId);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=participants.pdf")
                .body(pdf.readAllBytes());
    }
}