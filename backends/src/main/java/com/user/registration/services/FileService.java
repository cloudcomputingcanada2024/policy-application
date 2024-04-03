package com.user.registration.services;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@Service
public class FileService {

  private final ResourceLoader resourceLoader;


  public FileService(ResourceLoader resourceLoader) {
    this.resourceLoader = resourceLoader;
  }

  public Resource getPdfResource() {
//    return this.resourceLoader.getResource("classpath:static/pdf/output.pdf");
    return this.resourceLoader.getResource("output.pdf");
  }
 public Resource getPdfWrite() {
    return this.resourceLoader.getResource("classpath:static/pdf/Paper+Application+policy+(3).pdf");
  }

  public String getResourceFilePath(String fileName) {
//    try {
//      Resource resource = resourceLoader.getResource("classpath:static/pdf/" + fileName);
//
//      // Use the Resource abstraction to access the InputStream
//      try (InputStream inputStream = resource.getInputStream()) {
//        // Your logic to handle the resource (e.g., read content, copy, etc.)
//        // For example, you can copy the InputStream to a temporary file
////        Path tempFile = Files.createTempFile("temp", ".pdf");
////        Files.copy(inputStream, tempFile, StandardCopyOption.REPLACE_EXISTING);
//        Path filePath = resource.getFile().toPath();
//        // Return the absolute path of the temporary file
//        return filePath.toString();
//      }
//
//    } catch (IOException e) {
//      throw new RuntimeException("Error getting resource file path", e);
//    }
    try {
      ClassLoader classLoader = getClass().getClassLoader();
      InputStream inputStream = classLoader.getResourceAsStream("static/pdf/" + fileName);

      if (inputStream != null) {
        // Your logic to handle the resource (e.g., read content, copy, etc.)
        // For example, you can copy the InputStream to a temporary file
        Path tempFile = Files.createTempFile("temp", ".pdf");
        Files.copy(inputStream, tempFile, StandardCopyOption.REPLACE_EXISTING);

        // Return the absolute path of the temporary file
        return tempFile.toAbsolutePath().toString();
      } else {
        throw new RuntimeException("File not found: " + fileName);
      }
    } catch (IOException e) {
      throw new RuntimeException("Error getting resource file path", e);
    }
  }

  public String getStaticFilePath(String filename) {
    try {
      Resource resource = resourceLoader.getResource("classpath:static/pdf/" + filename);
      Path filePath = resource.getFile().toPath();

      if (Files.exists(filePath)) {
        System.out.println("if part file not found");
        return filePath.toString();
      } else {
        throw new RuntimeException("File not found: " + filename);
      }
    } catch (IOException e) {
      throw new RuntimeException("Error getting static file path", e);
    }
  }

}
