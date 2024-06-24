package org.crown.web.rest;

import org.crown.domain.Support;
import org.crown.service.MailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * REST controller for managing {@link org.crown.domain.Support}.
 */
@RequestMapping("/api")
@RestController
public class SupportResource {

    private final Logger log = LoggerFactory.getLogger(SupportResource.class);

    private final MailService mailService;

    public SupportResource(MailService mailService) {
        this.mailService = mailService;
    }

    /**
     * {@code POST /support}: submit support email
     */
    @PostMapping("/support")
    public void sendSupport(@Valid @RequestBody Support support) {
        mailService.sendSupportEmail(support);
    }
}
