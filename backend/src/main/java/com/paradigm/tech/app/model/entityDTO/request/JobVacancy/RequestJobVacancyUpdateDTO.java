package com.paradigm.tech.app.model.entityDTO.request.JobVacancy;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class RequestJobVacancyUpdateDTO {
    private String position;
    private String description;
    private Integer quota;
    private String status;
}
