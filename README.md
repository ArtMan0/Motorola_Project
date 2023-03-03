# Arkanoid
#### Szymon Przeździęk, Artur Mandziuk, Patryk Sobczuk, Mikołaj Bednarski, Żenia Szczerbyna

Aby uruchmoić grę należy pobrać repozytorium i uruchomić plik `index.html` w przeglądarce.

Gra składa się z nieskończonej ilości generowanych poziomów. Każdy z nich posiada ilość klocków, których liczba jest równa poziomowi. Klocki mają losowy kolor. Każdy kolor odpowiada konkretnej liczbie punktów.
Kolejno: "white": 50,
"orange": 60,
"aqua": 70,
"green": 80,
"red": 90,
"blue": 100,
"pink": 110,
"yellow": 120.
Poza klockami na planszy znajduje się piłka, która odbija się 90° od ścian planszy, sufitu, oraz krawędzi klocków,
natomiast od paletki odbija się w zależności od środka paletki. Paletka porusza się wzdłuż osi X, w zależności od położenia myszki. Gracz ma 3 życia. Gdy ilość żyć spadnie do 0, aktualny wynik punktów zapisuje się do localStorage, oraz jeżeli gracz pobije rekord, on także się zapisze.
Po zakończeniu gry ukazuje się okno, które informuje gracza o aktualnym wyniku, rekordzie oraz pozwala zagrać jeszcze raz.
