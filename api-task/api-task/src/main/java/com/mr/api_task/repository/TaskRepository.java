package com.mr.api_task.repository;

import com.mr.api_task.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task,  Long> {
}
