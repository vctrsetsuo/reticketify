package br.com.fiap.reticketify.user.service;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class WebhookTeamsService {

    @Value("${webhook.url}")
    private String url;

    public void createWebHook(String change, String username) {
        List<Sections> sectionsList = new ArrayList<>();

        Sections sections = new Sections();
        sections.setActivityTitle(change);
        sections.setActivitySubtitle("");

        List<Facts> factsList = new ArrayList<>();
        Facts facts = new Facts();
        facts.setName("");
        facts.setValue(username);
        factsList.add(facts);

        sections.setFacts(factsList);
        sections.setMarkdown(true);

        sectionsList.add(sections);

        sendWebHook(sectionsList, sections.getActivityTitle());
    }

    private void sendWebHook(List<Sections> sectionsList, String  summary) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        Map<String, Object> map = new HashMap<>();
        map.put("@type", "MessageCard");
        map.put("@context", "http://schema.org/extensions");
        map.put("@themeColor", "0076D7");
        map.put("summary", summary);
        map.put("sections", sectionsList);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(map, headers);
        System.out.println(url);
        ResponseEntity<String> response = restTemplate.postForEntity(this.url, entity, String.class);
    }

    @Data
    public static class Sections implements Serializable {
        private String activityTitle;
        private String activitySubtitle;
        private List<Facts> facts;
        private boolean markdown;
    }

    @Data
    public static class Facts {
        private String name;
        private String value;
    }
}
