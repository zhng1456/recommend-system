package com.yw.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import java.io.IOException;

@Configuration
public class FirebaseConfig {
    @Bean
    public Firestore firestore() throws IOException {
        ClassPathResource classPathResource = new ClassPathResource("firebase-adminsdk-key.json");
        GoogleCredentials credentials = GoogleCredentials.fromStream(classPathResource.getInputStream());
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(credentials)
                .build();
        FirebaseApp.initializeApp(options);
        return FirestoreClient.getFirestore();
    }
}
