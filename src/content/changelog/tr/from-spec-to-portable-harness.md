---
title: "DWP v1: plan döngüsünden taşınabilir çalışma ortamına"
description: "Deep Work Plan, tek seferlik bir plan yazma döngüsünden taşınabilir bir benimseme kitine dönüşüyor — güven ve köken bilgisi, daha geniş ajan-host desteği ve her deponun çalıştırabileceği bir uygunluk denetleyicisi."
date: 2026-06-12
version: "v1 · Temel"
kind: foundation
lang: tr
order: 5
featured: false
sourceLabel: "Skill changelog 2.3.0–2.16.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md"
---

Şimdiye kadar Deep Work Plan, bir ajanın tek bir oturum içinde izlediği bir plan yazma döngüsüydü. Bu sürüm dizisi onu bir deponun kendi koşullarında benimseyebileceği bir şeye dönüştürüyor — tek bir ajanın ve tek bir oturumun ötesine geçmeye adanmış ilk sürüm.

Skill, sağlama toplamlarıyla doğrulanan bir köken bilgisine sahip bir güven bildirimi kazanıyor; böylece bir geliştirici, kurulumdan önce tam olarak neyin okunup neyin yazıldığını görebiliyor. Katılım ön ayarları ve desteklenen ajan platformları önemli ölçüde genişliyor, test disiplini her görevin sonradan akla gelen bir eki değil, birinci sınıf bir parçası hâline geliyor ve bir uygunluk denetleyicisi, bir deponun standarda uyduğunu -varsayımla değil, nesnel olarak- doğrulamasını sağlıyor. Durum ve devam protokolü, kesintiye uğrayan bir planın baştan başlamak yerine kaldığı yerden devam edebilmesi anlamına geliyor. Perde arkasında, `.claude` ve `.cursor` uyumluluğu tek bir kanonik `.agents` dizininde birleşiyor; böylece desteklenen her ajan aynı kiti okuyor.

Bu sürümler birlikte, sıradaki aşama için temeli atıyor: depo artık yalnızca planın saklandığı yer olmaktan çıkıp ajanın çalışma ortamı hâline gelmeye başlıyor.

Tam sıralama için [skill'in sürüm geçmişini](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md) inceleyin.
