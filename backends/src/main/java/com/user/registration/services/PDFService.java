package com.user.registration.services;


import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;


public interface PDFService {

  ResponseEntity<?> createPDF(List<Map<String, Object>> pdfRequest) throws Exception;

  ResponseEntity<byte[]> downloadPDF() throws Exception;
}
