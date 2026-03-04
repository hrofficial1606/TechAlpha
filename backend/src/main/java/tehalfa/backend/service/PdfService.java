package tehalfa.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.io.*;
import java.util.List;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

import tehalfa.backend.repository.RegistrationRepository;
import tehalfa.backend.entity.EventRegistration;

@Service
@RequiredArgsConstructor
public class PdfService {

    private final RegistrationRepository repo;

    public ByteArrayInputStream generate(Long eventId)
            throws Exception {

        List<EventRegistration> list =
                repo.findByEventId(eventId);

        Document doc = new Document();
        ByteArrayOutputStream out =
                new ByteArrayOutputStream();

        PdfWriter.getInstance(doc,out);
        doc.open();

        doc.add(new Paragraph("Participants List"));

        for(EventRegistration r : list){
            doc.add(new Paragraph(
                    r.getUser().getEmail()
            ));
        }

        doc.close();

        return new ByteArrayInputStream(
                out.toByteArray());
    }
}