package com.user.registration.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.HTML;
import java.io.*;
import java.nio.file.*;
import java.util.Date;

@RestController
@RequestMapping("/api/v1/auth/file-create")
public class FileCreateController {

  public static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/uploads";
  @Value("${file.upload.directory:${user.home}}")
  public String upload;

  @GetMapping("/pdf/{fileId}")
  public ResponseEntity<?> fileCreate(@PathVariable("fileId") String fileId, MultipartFile multipartFile) throws IOException {


    Path path = Paths.get(upload, "userProfile").toAbsolutePath().normalize();

    if (!Files.exists(path)) {
      Files.createDirectories(path);
    }

    try {

      InputStream inputStream = multipartFile.getInputStream();

      String fileName = dateGenerate(multipartFile.getOriginalFilename(), path);
      Path filePath = path.resolve(fileName);

      if (Files.exists(filePath)) {
        throw new FileAlreadyExistsException("Already exists");
      }

      Files.copy(inputStream, filePath);
      return ResponseEntity.ok().body("file is create by you ID");

    } catch (Exception e) {
      throw new RuntimeException("Error getting resource file path", e);

    }
  }

  private String dateGenerate(String name, Path path) {
    String baseName = name.replaceFirst("^\\d+-", "");
    String timestemp = new Date().getTime() + "-";
    System.out.println(baseName);
    String uniqueName = timestemp + baseName;

    int count = 1;
    Path filepath = path.resolve(uniqueName);
    while (Files.exists(filepath)) {

      uniqueName =  timestemp + "-" + count + "-" + baseName;
      filepath = path.resolve(uniqueName);
      count++;
    }
    return uniqueName;
  }

  @GetMapping("/angular-app")
  public String loadAngular() {

    try {
      Resource resource = new ClassPathResource("static/angular/index.html");

      Path path = resource.getFile().toPath();
      String content = Files.readAllLines(path).stream().reduce("", String::concat);
      return content;
    } catch (IOException e) {
      e.printStackTrace();
      return "Error handling the html file";
    }
  }

  @GetMapping(value = "/html", produces = MediaType.TEXT_HTML_VALUE)
  public String html() {
    return "<html><body>" + loadAngular() + "</body></html>";
  }


}
