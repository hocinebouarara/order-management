package com.hocinebouarara.order_management.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8081") // الواجهة الأمامية الخاصة بك
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // السماح بأساليب معينة
                .allowedHeaders("Authorization", "Content-Type") // السماح برؤوس معينة
                .allowCredentials(true);// السماح بإرسال ملفات تعريف الارتباط أو رؤوس التوثيق
    }
}

