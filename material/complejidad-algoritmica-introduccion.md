---
title: Introducción rápida a Complejidad Algorítmica
---

[← Volver a Programación II](../guia-prog2.md)

# Introducción rápida a Complejidad Algorítmica

La complejidad algorítmica permite estimar cómo crece el costo de un algoritmo cuando crece el tamaño de la entrada.

Ese costo suele medirse en:

- tiempo (cantidad de operaciones);
- espacio (memoria extra utilizada).

## ¿Por qué importa?

Dos algoritmos pueden resolver el mismo problema, pero escalar muy distinto.

- Uno puede tardar el doble cuando la entrada se duplica.
- Otro puede tardar cuatro veces, diez veces o mucho más.

Analizar complejidad ayuda a elegir soluciones que sigan siendo viables con datos grandes.

## ¿Qué significa "tamaño de entrada"?

Cuando hablamos de $n$, primero hay que definir qué está midiendo:

- en arreglos o listas, suele ser la cantidad de elementos;
- en matrices, puede ser filas, columnas o ambas;
- en strings, la cantidad de caracteres;
- en grafos, suele usarse $V$ (vértices) y $E$ (aristas).

Un buen análisis siempre empieza aclarando esa variable.

## Notación asintótica

La notación más usada es O-grande.

- $O(1)$: constante.
- $O(n)$: lineal.
- $O(n^2)$: cuadrática.
- $O(\log n)$: logarítmica.
- $O(2^n)$: exponencial.

Cuando usamos O-grande, nos enfocamos en el crecimiento para valores grandes de $n$ y omitimos constantes y términos menores.

Ejemplo:

$$
3n^2 + 5n + 20 \in O(n^2)
$$

También aparecen otras dos notaciones:

- $\Omega(f(n))$: cota inferior asintótica.
- $\Theta(f(n))$: cota ajustada (superior e inferior del mismo orden).

Ejemplo típico:

$$
7n + 3 \in O(n), \quad 7n + 3 \in \Omega(n), \quad 7n + 3 \in \Theta(n)
$$

En una primera aproximación práctica:

- O-grande responde "a lo sumo crece así";
- Ω-grande responde "al menos crece así";
- Θ-grande responde "crece de este orden".

## Mejor, promedio y peor caso

Para un mismo algoritmo, el costo puede variar según la entrada.

- mejor caso: situación más favorable;
- caso promedio: costo esperado sobre una distribución de entradas;
- peor caso: cota máxima para entradas de tamaño $n$.

En materias introductorias se prioriza el peor caso porque da una garantía robusta.

## Regla práctica para analizar código

1. Identificar la operación dominante.
2. Contar cuántas veces se ejecuta según $n$.
3. Quedarse con el término de mayor crecimiento.

Atajos útiles:

- secuencia de bloques: se suman costos (si un bloque es dominante, absorbe a los demás);
- ciclos anidados: suelen multiplicar costos;
- ramas condicionales: tomar la rama más costosa para peor caso.

## Ejemplo 1: búsqueda lineal

```c
#include <stdbool.h>

bool contiene(const int v[], int n, int objetivo) {
    for (int i = 0; i < n; i++) {
        if (v[i] == objetivo) {
            return true;
        }
    }
    return false;
}
```

Análisis:

- mejor caso: $O(1)$ (si aparece al principio);
- caso promedio: $O(n)$;
- peor caso: $O(n)$ (si está al final o no está);
- memoria extra: $O(1)$.

## Ejemplo 2: doble ciclo

```c
int contar_pares(const int v[], int n) {
    int contador = 0;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if ((v[i] + v[j]) % 2 == 0) {
                contador++;
            }
        }
    }
    return contador;
}
```

Análisis:

- el ciclo interno se ejecuta, en total, proporcional a $n^2$;
- tiempo: $O(n^2)$;
- memoria extra: $O(1)$.

## Ejemplo 3: recursividad simple

```c
int suma_hasta(const int v[], int n) {
    if (n == 0) {
        return 0;
    }
    return v[n - 1] + suma_hasta(v, n - 1);
}
```

Relación de recurrencia:

$$
T(n) = T(n-1) + O(1)
$$

Entonces:

- tiempo: $O(n)$;
- memoria extra: $O(n)$ por profundidad de pila recursiva.

Este punto es importante: un algoritmo puede tener buen tiempo y, sin embargo, usar más memoria por la recursión.

## Escalas de crecimiento más comunes

De menor a mayor crecimiento:

$$
O(1) < O(\log n) < O(n) < O(n\log n) < O(n^2) < O(2^n) < O(n!)
$$

Para entradas grandes, cambiar de $O(n^2)$ a $O(n\log n)$ suele tener un impacto muy grande en tiempos reales.

## Relación con recursividad y backtracking

En recursividad y backtracking, la complejidad suele depender del árbol de llamadas.

- Si cada estado genera varias alternativas, el costo puede crecer exponencialmente.
- Por ejemplo, muchos problemas de backtracking tienen peor caso $O(2^n)$ o peor.
- Las podas no cambian necesariamente el peor caso, pero mejoran mucho la práctica.

## Mini resumen

- Complejidad describe cómo escala un algoritmo.
- O-grande compara crecimientos, no tiempos exactos de reloj.
- Para analizar, importa la operación dominante.
- Elegir un algoritmo con mejor complejidad puede ser la diferencia entre resolver un problema o no.
