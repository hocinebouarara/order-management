# استخدم صورة OpenJDK المستقرة (يفضل استخدام LTS مثل 21 بدلاً من 23)
FROM openjdk:21-jdk-slim

# تحديد مكان العمل داخل الحاوية
WORKDIR /app

# نسخ ملف JAR النهائي من target إلى الحاوية
COPY target/*.jar app.jar

# فتح المنفذ 8080 (اختياري، فقط للتوثيق)
EXPOSE 8080

# تشغيل التطبيق
ENTRYPOINT ["java", "-jar", "app.jar"]
