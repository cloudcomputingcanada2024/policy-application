package com.user.registration.entities;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

import java.util.List;

@Data
public class PDFData {
  private String[] Data;
  private JsonNode applications;


  public PDFData() {

  }

//  public PDFData(List<String> application) {
//    this.application = application;
//  }
}
