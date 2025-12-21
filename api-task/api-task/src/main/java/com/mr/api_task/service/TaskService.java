package com.mr.api_task.service;


import com.mr.api_task.entity.Task;
import com.mr.api_task.repository.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PatchMapping;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task create(Task task) {
        // Garante que completed não é null
        if (task.getCompleted() == null) {
            task.setCompleted(false);
        }
        return taskRepository.save(task);
    }

    public Task findTaskById(Long id){
        return taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("TASK NÃO ENCONTRADA"));
    }

    public List<Task> findAllTasks(){
        return taskRepository.findAll();
    }


    public Task updateStatus(Long id, Task taskStatus){
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("TASK NÃO ENCONTRADA"));
        task.setCompleted(taskStatus.getCompleted());

        return taskRepository.save(task);
    }

    public void delete(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task não encontrada"));

        taskRepository.delete(task);
    }
}
