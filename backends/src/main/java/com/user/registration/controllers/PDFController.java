package com.user.registration.controllers;

import com.user.registration.services.FileService;
import com.user.registration.services.PDFService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth/pdf")
public class PDFController {


  @Autowired
  private final PDFService pdfService;
  private final FileService fileService;
  Logger logger = LoggerFactory.getLogger(PDFController.class);

  public PDFController(PDFService pdfService, FileService fileService) {
    this.pdfService = pdfService;
    this.fileService = fileService;
  }

  @PostMapping("/create")
  public ResponseEntity<ResponseEntity<?>> PDFCreate(@RequestBody List<Map<String, Object>> dataList) {
    try {
      return ResponseEntity.ok(this.pdfService.createPDF(dataList));
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @GetMapping("/download")
  public ResponseEntity<byte[]> downloadPdf() {
    try {
      return ResponseEntity.ok(this.pdfService.downloadPDF().getBody());

    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }


}
