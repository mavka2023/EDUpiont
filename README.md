# Różnice implementacji

#### Linki do edycji lub wyświetlania
Planowaliśmy udostępnić możliwość tworzenia dwóch rodzajów linków do tej samej treści - linków z możliwością edytowania treści oraz linków tylko do wyświetlania. Zrezygnowaliśmy z linków z możliwością edycji i w aktualnej wersji aplikacji możliwe jest tworzenie linków tylko do wyświetlania.

#### Kalendarz
Planowaliśmy zaimplementować zakładkę z kalendarzem, w której możliwe byłoby planowanie swojej nauki i tworzenie przypomnień, np. wypełnienia testu lub nauczenia się z notatek. Ze względu na skalę aplikacji zrezygnowaliśmy z tego pomysłu, który nie był kluczową funkcjonalnością do działania EduPoint.

#### Sprawdzanie testów
Rozważaliśmy możliwość wyświetlania wyniku testu po jego wysłaniu. Jednakże zauważyliśmy, że często niemożliwe jest automatyczne sprawdzenie odpowiedzi tekstowej, więc zrezygnowaliśmy z tego pomysłu. W aktualnej wersji odpowiedzi są wysyłane do osoby, która stworzyła test.

# Heurystyki Nielsena

Interfejs jest stworzony zgodnie z heurystykami Nielsena, uwagi z poprzednich zajęć uwzględniliśmy w finalnej wersji.

#### Przykłady wykorzystania:
**1: Pokazuj status systemu** - błędy w formularzach są na bieżąco wyświetlane, informacja o wysłania testu jest wyświetlana użytkownikowi po kliknięciu przycisku ukończenia testu

**2: Zachowaj zgodność pomiędzy systemem a rzeczywistością** - ikonki w systemie są zgodne z standardami, komunikaty są zrozumiałe

**3: Daj użytkownikowi pełną kontrolę** - użytkownik jest informowany o niezapisanych postępach i dana jest mu możliwość wyjścia z zapisaniem, bez zapisania lub zostania na stronie

**4: Trzymaj się standardów i zachowaj spójność** - na stronie wykorzystywany jest tylko jeden, ustandaryzowany rodzaj przycisków

**5: Zapobiegaj błędom** - przy zapisaniu użytkownik pytany jest o potwierdzenie

**6: Pokaż, zamiast zmuszać do pamiętania** - nazwy pól są odpowiednio wyświetlane użytkownikowi, nie znikają po wpisaniu wartości, pole aktualnej zakładki w nawigacji jest podświetlane

**7: Elastyczność i efektywność** - interfejs jest dostosowany zarówno dla potrzeb początkujących, jak i zaawansowanych użytkowników

**8: Dbaj o estetykę i umiar** - interfejs jest minimalistyczny i wyświetlane są tylko najważniejsze informacje

**9: Zapewnij skuteczną obsługę błędów** - komunikaty o błędnych wartościach (np. za krótkich pytaniach, lub błędnych emailach) sa wyświetlane użytkownikowi i zapobiegają błędnym zapisom

**10: Zadbaj o pomoc i dokumentację** - interfejs jest intuicyjny i nieskomplikowany, co sprawia, że dokumentacja nie jest niezbędna dla początkujących użytkowników.

# Instrukcja uruchomienia EduPoint

1. Run `cd .\edupoint-frontend\`
2. Install node & npm https://nodejs.org/en/download
3. Run `npm install`
4. Run `npm run start`
5. App is running on http://localhost:3000