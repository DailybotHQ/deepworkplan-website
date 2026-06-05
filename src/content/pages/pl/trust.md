---
title: "Zaufanie i bezpieczeństwo"
description: "Dlaczego Deep Work Plan jest bezpieczny w adopcji: open source i MIT, Markdown-first bez połączeń sieciowych ani telemetrii, niedestrukcyjny z założenia, z weryfikowalnymi instalacjami i przejrzystą polityką ujawniania podatności."
lastUpdated: 2026-06-05
---

## Dlaczego możesz mu zaufać

Nikt nie powinien instalować skilla, któremu nie może ufać. Deep Work Plan jest zbudowany tak, by dało się go zweryfikować, a nie przyjąć na wiarę: open source, Markdown-first, niedestrukcyjny i sprawdzalny przed uruchomieniem.

- **Open source na licencji MIT** — witryna i skill są publiczne i diffowalne; przeczytaj każdą linię przed uruchomieniem.
- **Markdown-first — bez sieci, bez telemetrii** — brak CLI, API HTTP, brak przepływu uwierzytelniania; nie wykonuje żadnych połączeń sieciowych i nie wysyła telemetrii. Żadna informacja o Twoim repozytorium nie opuszcza Twojej maszyny.
- **Niedestrukcyjny z założenia** — jedyne działanie skilla istotne z punktu widzenia bezpieczeństwa to zmiana Twojego repozytorium, a robi to przez uzgadnianie, a nie nadpisywanie: wykrywa, co istnieje, proponuje plan i pyta przed zastąpieniem czegokolwiek. Efekty planu trafiają do ignorowanego przez git katalogu `.dwp/`.
- **Nie dotyka sekretów** — nigdy nie zatwierdza sekretów, dopisuje do `.gitignore` zamiast go nadpisywać i utrzymuje zmiany w małych, nadających się do przeglądu diffach.
- **Weryfikowalne pochodzenie** — każde wydanie publikuje sumy kontrolne dla dostarczonego skilla.

---

## Zweryfikuj przed uruchomieniem

Traktuj skill jako niezaufany, dopóki go nie sprawdzisz. Każde wydanie dołącza plik `SHA256SUMS` obejmujący dostarczony skill. Pobierz go dla wersji, którą zamierzasz zainstalować, a następnie sprawdź, czy Twoja kopia pasuje — niezerowe wyjście oznacza, że plik nie pasuje i powinieneś się zatrzymać.

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git
cd deepworkplan-skill
# Download the checksums for the release you intend to install (replace vX.Y.Z):
curl -fsSL -o SHA256SUMS \
  https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
./setup.sh --verify        # non-zero exit means a file does not match — stop
```

Wydania są **sumowane kontrolnie, nie podpisywane** — podpisywanie (cosign lub GPG opiekuna) to udokumentowany kolejny krok, a nie bieżące twierdzenie. Ponieważ wszystko jest otwarte, możesz też diffować dowolny plik względem repozytorium przy jego tagu.

---

## Zgłoś podatność

Problemy z bezpieczeństwem zgłaszaj prywatnie na adres **security@dailybot.com**, zamiast otwierać publiczne zgłoszenie. Potwierdzamy odbiór raportów w ciągu 3 dni roboczych i dążymy do dostarczenia poprawki lub łagodzenia w ciągu 30 dni dla ważnych ustaleń, w zależności od powagi. Witryna i skill dzielą tę samą politykę.

---

## Uczciwe ograniczenia

- Wydania są sumowane kontrolnie, ale jeszcze nie podpisywane kryptograficznie — podpisywanie jest zaplanowane, nie wykonane.
- Deep Work Plan uruchamia autonomicznego agenta kodującego względem Twojego repozytorium. Przeglądaj jego proponowany plan i diffe; metodyka jest zaprojektowana do tego przeglądu, nie do jego zastąpienia.
- Twierdzenia dotyczące zaufania opisują wyłącznie oficjalne źródła. Zmodyfikowana lub zewnętrzna kopia, która odeszła od repozytoriów, nie niesie żadnej z tych gwarancji — najpierw ją zweryfikuj.

---

## Zasoby dotyczące zaufania

- [Manifest zaufania odczytywalny przez maszyny](https://deepworkplan.com/.well-known/dwp-trust.json)
- [security.txt (RFC 9116)](https://deepworkplan.com/.well-known/security.txt)
- [Polityka bezpieczeństwa witryny](https://github.com/DailybotHQ/deepworkplan-website/blob/main/SECURITY.md)
- [Polityka bezpieczeństwa skilla i model zagrożeń](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/SECURITY.md)
- [Przeczytaj metodykę](/methodology)
- [Adopcja (init)](/init)
