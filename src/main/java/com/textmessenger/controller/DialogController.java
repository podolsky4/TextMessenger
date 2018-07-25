package com.textmessenger.controller;

import com.textmessenger.model.Dialog;
import com.textmessenger.service.DialogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/dialogs")
public class DialogController {

  private final DialogService dialogService;

  public DialogController(DialogService dialogService) {
    this.dialogService = dialogService;
  }

  @PostMapping("/user")
  public ResponseEntity<?> createDialog(@RequestBody Dialog dialog) {
    dialogService.createDialog(dialog);
    URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .build().toUri();
    return ResponseEntity.created(location).build();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Dialog> readDialog(@PathVariable("id") long id) {
    return Optional.ofNullable(ResponseEntity.ok().body(dialogService.readDialog(id)))
            .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> updateDialog(@PathVariable("id") long id, @RequestBody Dialog dialog) {
    dialogService.updateDialog(id, dialog);
    return ResponseEntity.ok().body(dialogService.readDialog(id) + " is updated");
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteDialog(@PathVariable("id") long id) {
    dialogService.deleteDialog(id);
    return ResponseEntity.ok().body("dialog with id: " + id + " deleted");
  }
}
