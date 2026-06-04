---
title: Dodatki
description: "Opcjonalne rozszerzenia podstawowej metodyki DWP: skille, agenci, presety, adaptery i przykłady oraz to, jak każde z nich rozszerza przepływ pracy, nie będąc wymaganym."
order: 5
lang: pl
section: Addons
---

# Dodatki

**Wersja 1.0.** Dodatki to opcjonalne rozszerzenia podstawowej metodyki DWP. Nie są wymagane do zgodności, ale zapewniają dodatkowe możliwości.

## Skille

Skille to powtarzalne procedury wywoływane po nazwie. Skill pakuje powtarzalny przepływ pracy (uruchamianie testów, naprawę lintingu, tworzenie komponentu).

Metodyka dostarcza niewielki zestaw podstawowych sub-skilli. Wśród nich sub-skill **author** pozwala repozytorium **rozwijać własny kit**: wywoływany przez `/skill-create` i `/agent-create`, analizuje istniejący układ `.agents/` i konwencje repozytorium, a następnie tworzy nowy skill, agenta lub cienki delegator komendy, który do nich pasuje, i utrzymuje katalog w synchronizacji. Ten sam sub-skill wykonuje obowiązkowe zadanie odkrywania skilli i agentów.

## Agenci

Agenci to wyspecjalizowani wykonawcy o zdefiniowanej roli (recenzent, wykonawca, architekt).

## Dodatki utrzymaniowe

Dodatki utrzymaniowe to opcjonalne rozszerzenia, nigdy niewymagane do zgodności, które pomagają repozytorium utrzymywać samo siebie. Dodatek **dependency-upgrade** analizuje rzeczywisty menedżer pakietów repozytorium (zamiast zakładać npm) i aktualizuje zależności w małych, zwalidowanych i odwracalnych partiach: wykrywa menedżer na podstawie rzeczywistego manifestu i pliku blokady, klasyfikuje aktualizacje według semver, aktualizuje partiami, uruchamia rzeczywistą bramkę walidacyjną repozytorium po każdej partii, wycofuje każdą partię, która zakończy się niepowodzeniem, i podsumowuje bez automatycznego commitowania. Dodatek jest instalowany tylko wtedy, gdy zostanie zaakceptowany podczas onboardingu.

## Presety

Presety dostosowują DWP do konkretnego stosu technologicznego (Django, React, Go).

## Adaptery

Adaptery mapują komendy DWP na system komend konkretnego agenta (Claude Code, Cursor, Codex).

## Przykłady

Przykłady pokazują DWP w praktyce (porównania przed/po, przykładowe plany, studia przypadków).
