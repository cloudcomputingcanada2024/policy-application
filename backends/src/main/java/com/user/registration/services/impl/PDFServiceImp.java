package com.user.registration.services.impl;
import com.itextpdf.forms.PdfAcroForm;
import com.itextpdf.forms.fields.PdfFormField;
import com.itextpdf.kernel.pdf.*;
import com.itextpdf.kernel.pdf.annot.PdfWidgetAnnotation;
import com.user.registration.services.FileService;
import com.user.registration.services.PDFService;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.*;
import java.util.*;

@EnableWebMvc

@Service
public class PDFServiceImp implements PDFService, WebMvcConfigurer {


  @Autowired
  private final FileService fileService;
  @Autowired
  private ResourceLoader resourceLoader;


  Logger logger = LoggerFactory.getLogger(PDFServiceImp.class);

  public PDFServiceImp(FileService fileService) {
    this.fileService = fileService;
  }

  @Override
  public ResponseEntity<?> createPDF(List<Map<String, Object>> dataList) throws IOException {

    logger.info("request info", dataList.toString());

    this.pdf_file(dataList);

    return new ResponseEntity<>(HttpStatus.OK);

  }

  private void pdf_file(List<Map<String, Object>> dataList) {

    Resource resource = new ClassPathResource("static/pdf/Paper+Application+policy+(3).pdf");

    try {

      PdfDocument pdfDocument = new PdfDocument(new PdfReader(resource.getInputStream()), new PdfWriter("output.pdf"));
      PdfAcroForm acroForm = PdfAcroForm.getAcroForm(pdfDocument, true);

      int numberOfPages = pdfDocument.getNumberOfPages();

      if (acroForm != null) {
        acroForm.getFormFields().forEach((name, field) -> {
          Map<String, PdfFormField> formField = acroForm.getFormFields();
          PdfWidgetAnnotation widgetAnnotation = field.getWidgets().get(0);
          PdfPage page = widgetAnnotation.getPage();

          if (page != null) {
//            if (page != null && acroForm.getPdfDocument().getPageNumber(page) == targetPageNumber) {
//              System.out.println("page number: " + (acroForm.getPdfDocument().getPageNumber(page) == targetPageNumber));
//              System.out.println("Field Name: " + field.getFieldName());
//              System.out.println("Field Name: " + name);
////              You can add more information about the field as needed
//              System.out.println("---------------------------");
//            }

            for (int i = 0; i < dataList.size(); i++) {
              Map<String, Object> data = dataList.get(i);

              if (data != null) {
                for (Map.Entry<String, Object> entry : data.entrySet()) {
                  String key = entry.getKey();
                  Object value = entry.getValue();


                  if (name.equals(key)) {
                    formField.get(key).setValue(String.valueOf(value));
                  }

                }
              }
            }

          }

        });
      }
      pdfDocument.close();

    } catch (IOException e) {
      e.printStackTrace();
    }

  }

  @Override
  public ResponseEntity<byte[]> downloadPDF() {

    try {

      File file = new File("output.pdf");

      FileInputStream fileInputStream = new FileInputStream(file);

      byte[] pdfBytes;
      try (InputStream inputStream = fileInputStream) {
        pdfBytes = IOUtils.toByteArray(inputStream);
      }

      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_PDF);
      headers.setContentDispositionFormData("attachment", "output.pdf");

      return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    } catch (Exception e) {
      System.out.println(e.getMessage());
    }
    return null;
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/static/**")
      .addResourceLocations("classpath:/static/");
  }
}
