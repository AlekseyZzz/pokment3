package com.pokermentor.webui.controller;

import com.pokermentor.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {
    
    @Autowired
    private SessionService sessionService;
    
    @GetMapping("/")
    public String dashboard(Model model) {
        // Get recent sessions for dashboard
        var recentSessions = sessionService.getAllSessions(PageRequest.of(0, 5));
        model.addAttribute("recentSessions", recentSessions.getContent());
        
        // Add mock data for game quality analytics
        model.addAttribute("aGamePercentage", 25);
        model.addAttribute("bGamePercentage", 45);
        model.addAttribute("cGamePercentage", 20);
        model.addAttribute("dGamePercentage", 10);
        
        return "dashboard";
    }
    
    @GetMapping("/pre-session")
    public String preSession() {
        return "pre-session";
    }
    
    @GetMapping("/post-session")
    public String postSession() {
        return "post-session";
    }
    
    @GetMapping("/progress")
    public String progress(Model model) {
        var allSessions = sessionService.getAllSessions(PageRequest.of(0, 20));
        model.addAttribute("sessions", allSessions.getContent());
        return "progress";
    }
    
    @GetMapping("/analysis")
    public String analysis() {
        return "analysis";
    }
    
    @GetMapping("/knowledge")
    public String knowledge() {
        return "knowledge";
    }
    
    @GetMapping("/training")
    public String training() {
        return "training";
    }
    
    @GetMapping("/settings")
    public String settings() {
        return "settings";
    }
}