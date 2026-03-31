package org.techalfa.auth.service;

import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.stereotype.Service;
import org.techalfa.auth.dto.RegistrationResponse;
import org.techalfa.auth.entity.Event;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminRegistrationPdfService {

    private static final float MARGIN = 48f;
    private static final float PAGE_BREAK_LIMIT = 100f;
    private static final float BODY_FONT_SIZE = 10f;
    private static final float HEADING_FONT_SIZE = 18f;
    private static final float SUBHEADING_FONT_SIZE = 12f;
    private static final float LEADING = 16f;
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd MMM yyyy hh:mm a");

    private final PDFont headingFont = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);
    private final PDFont bodyFont = new PDType1Font(Standard14Fonts.FontName.HELVETICA);

    public byte[] generateEventRegistrationsPdf(Event event, List<RegistrationResponse> registrations) {
        try (PDDocument document = new PDDocument(); ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            PdfPageState state = startPage(document);

            state.contentStream.setFont(headingFont, HEADING_FONT_SIZE);
            state.y = writeLine(state.contentStream, MARGIN, state.y, "TechAlpha Registered Candidates");

            state.contentStream.setFont(bodyFont, BODY_FONT_SIZE);
            state.y = writeLine(state.contentStream, MARGIN, state.y - 6, "Event: " + safe(event.getTitle()));
            state.y = writeLine(state.contentStream, MARGIN, state.y, "Venue: " + safe(event.getVenue()));
            state.y = writeLine(state.contentStream, MARGIN, state.y, "Total registrations: " + registrations.size());
            state.y = writeLine(state.contentStream, MARGIN, state.y, "Generated: " + formatDate(LocalDateTime.now()));
            state.y -= 6;

            state.contentStream.setFont(headingFont, SUBHEADING_FONT_SIZE);
            state.y = writeWrappedText(state, "Candidate Details");
            state.contentStream.setFont(bodyFont, BODY_FONT_SIZE);

            for (int index = 0; index < registrations.size(); index++) {
                RegistrationResponse registration = registrations.get(index);
                state = ensureRoom(document, state, 72f);
                state.y = writeWrappedText(state, (index + 1) + ". " + safe(registration.userFullName()) + " | " + safe(registration.userEmail()));
                state.y = writeWrappedText(state, "    Status: " + safe(registration.status()) + " | Amount: " + safe(registration.amount()) + " | Registered: " + formatDate(registration.registeredAt()));
                state.y = writeWrappedText(state, "    Paid At: " + formatDate(registration.paidAt()) + " | Attended At: " + formatDate(registration.attendedAt()) + " | Certificate: " + safe(registration.certificateCode()));
                state.y = writeWrappedText(state, "    Venue: " + safe(registration.venue()) + " | Event ID: " + registration.eventId() + " | Registration ID: " + registration.id());
                state.y -= 6;
            }

            state.contentStream.close();
            document.save(outputStream);
            return outputStream.toByteArray();
        } catch (IOException exception) {
            throw new IllegalStateException("Unable to generate registrations PDF.", exception);
        }
    }

    private PdfPageState ensureRoom(PDDocument document, PdfPageState state, float requiredSpace) throws IOException {
        if (state.y > PAGE_BREAK_LIMIT + requiredSpace) {
            return state;
        }

        state.contentStream.close();
        PdfPageState nextState = startPage(document);
        nextState.contentStream.setFont(bodyFont, BODY_FONT_SIZE);
        return nextState;
    }

    private PdfPageState startPage(PDDocument document) {
        try {
            PDPage page = new PDPage(PDRectangle.A4);
            document.addPage(page);
            PDPageContentStream contentStream = new PDPageContentStream(document, page);
            float startY = page.getMediaBox().getHeight() - MARGIN;
            return new PdfPageState(page, contentStream, startY);
        } catch (IOException exception) {
            throw new IllegalStateException("Unable to create PDF page.", exception);
        }
    }

    private float writeWrappedText(PdfPageState state, String text) throws IOException {
        String remaining = safe(text);
        float availableWidth = state.page.getMediaBox().getWidth() - (2 * MARGIN);

        while (!remaining.isBlank()) {
            int breakIndex = findBreakIndex(remaining, availableWidth, bodyFont, BODY_FONT_SIZE);
            String line = remaining.substring(0, breakIndex).trim();
            state.y = writeLine(state.contentStream, MARGIN, state.y, line);
            remaining = remaining.substring(Math.min(breakIndex, remaining.length())).trim();
        }

        return state.y;
    }

    private int findBreakIndex(String text, float maxWidth, PDFont font, float fontSize) throws IOException {
        if (font.getStringWidth(text) / 1000 * fontSize <= maxWidth) {
            return text.length();
        }

        int breakIndex = text.length();
        while (breakIndex > 0) {
            breakIndex = text.lastIndexOf(' ', breakIndex - 1);
            if (breakIndex <= 0) {
                return Math.min(text.length(), 80);
            }
            String candidate = text.substring(0, breakIndex).trim();
            if (font.getStringWidth(candidate) / 1000 * fontSize <= maxWidth) {
                return breakIndex;
            }
        }

        return Math.min(text.length(), 80);
    }

    private float writeLine(PDPageContentStream contentStream, float x, float y, String text) throws IOException {
        contentStream.beginText();
        contentStream.newLineAtOffset(x, y);
        contentStream.showText(text);
        contentStream.endText();
        return y - LEADING;
    }

    private String formatDate(LocalDateTime value) {
        return value == null ? "-" : DATE_FORMATTER.format(value);
    }

    private String safe(Object value) {
        return value == null ? "-" : String.valueOf(value);
    }

    private static final class PdfPageState {
        private final PDPage page;
        private final PDPageContentStream contentStream;
        private float y;

        private PdfPageState(PDPage page, PDPageContentStream contentStream, float y) {
            this.page = page;
            this.contentStream = contentStream;
            this.y = y;
        }
    }
}
