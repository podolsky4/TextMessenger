package com.textmessenger.repository;

import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DialogRepository extends JpaRepository<Dialog, Long> {

    List<Dialog> findDialogsByUsers(User user);
}
