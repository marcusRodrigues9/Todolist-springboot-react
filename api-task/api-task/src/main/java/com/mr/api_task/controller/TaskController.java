package com.mr.api_task.controller;


import com.mr.api_task.entity.Task;
import com.mr.api_task.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")

public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> create(@RequestBody Task task){
        if (task.getCompleted() == null) {
            task.setCompleted(false);
        }
        Task taskCreate = taskService.create(task);
        return ResponseEntity.created(URI.create("api/tasks/" + taskCreate.getId())).body(taskCreate);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> findTaskById(@PathVariable Long id){
        Task taskExistent = taskService.findTaskById(id);
        return ResponseEntity.ok(taskExistent);
    }

    @GetMapping
    public ResponseEntity<List<Task>> findAllTasks(){
        List<Task> tasks = taskService.findAllTasks();
        return ResponseEntity.ok(tasks);
    }
    @PatchMapping("/{id}")
    public ResponseEntity<Task> updateStatus(@PathVariable Long id, @RequestBody Task taskStatus) {
        Task updatedTask = taskService.updateStatus(id, taskStatus);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
