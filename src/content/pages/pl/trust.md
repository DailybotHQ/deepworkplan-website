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
git checkout v7.8.1
# Download the checksums for the release you intend to install (current release v7.8.1):
curl -fsSL -o SHA256SUMS \
  https://github.com/DailybotHQ/deepworkplan-skill/releases/download/v7.8.1/SHA256SUMS
# Expected SHA256SUMS digest: 5b288fad7cd0cee810092d30f8a502e73e0b04b69510510faa649e1270671779
./setup.sh --verify        # non-zero exit means a file does not match — stop
```

Tabela przypięć ekosystemu w [/init.md#trust-and-verification](/init.md#trust-and-verification) zawiera skróty dla pakietu i dodatków.

Wydania są **sumowane kontrolnie, nie podpisywane** — podpisywanie (cosign lub GPG opiekuna) to udokumentowany kolejny krok, a nie bieżące twierdzenie. Ponieważ wszystko jest otwarte, możesz też diffować dowolny plik względem repozytorium przy jego tagu.

Ta sama zasada dotyczy instalatora DeepWorkPlan Vim: jego strona pokazuje SHA-256 skryptu udostępnianego teraz oraz kroki: pobierz, sprawdź, zweryfikuj, uruchom. [Sprawdź instalator DeepWorkPlan Vim](/kit/vim#inspect-before-you-run)

---

## Zgłoś podatność

Problemy z bezpieczeństwem zgłaszaj **prywatnie przez prywatne raportowanie podatności GitHub** we właściwym repozytorium — nie jako publiczne zgłoszenie, które ujawniłoby problem przed powstaniem poprawki:

- Skill: <https://github.com/DailybotHQ/deepworkplan-skill/security>
- Website: <https://github.com/DailybotHQ/deepworkplan-website/security>

---

## Uczciwe ograniczenia

- Wydania są sumowane kontrolnie, ale jeszcze nie podpisywane — podpisywanie jest zaplanowane, nie wykonane.
- Deep Work Plan uruchamia autonomicznego agenta kodującego względem Twojego repozytorium. Przeglądaj jego proponowany plan i diffe; metodyka jest zaprojektowana do tego przeglądu, nie do jego zastąpienia.
- Twierdzenia dotyczące zaufania opisują wyłącznie oficjalne źródła. Zmodyfikowana lub zewnętrzna kopia, która odeszła od repozytoriów, nie niesie żadnej z tych gwarancji — najpierw ją zweryfikuj.

---

## Zasoby dotyczące zaufania

- [Manifest zaufania odczytywalny przez maszyny](https://deepworkplan.com/.well-known/dwp-trust.json)
- [security.txt (RFC 9116)](https://deepworkplan.com/.well-known/security.txt)
- [Polityka bezpieczeństwa witryny](https://github.com/DailybotHQ/deepworkplan-website/blob/main/SECURITY.md)
- [Polityka bezpieczeństwa skilla i model zagrożeń](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/SECURITY.md)
- [Przeczytaj metodykę](/methodology)
- [Adopcja (init)](/pl/quickstart)
