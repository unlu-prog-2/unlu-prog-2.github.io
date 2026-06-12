---
title: TAD Tablas Hash - Operaciones, colisiones y complejidad
---

[← Volver a Programación II](../guia-prog2.md)

# TAD Tablas Hash - Operaciones, colisiones y complejidad

Este apunte resume la idea de Tabla Hash, sus operaciones del TAD y las dos estrategias de colisión que se trabajan en la cátedra: lista de colisiones y zona de overflow.

---

## ¿Qué es una Tabla Hash?

Una tabla hash permite guardar pares (clave, valor) y acceder por clave en tiempo promedio constante.

La clave se transforma en una posición mediante una función hash:

$$
pos = h(clave)
$$

En este curso la clave es un entero y se usa, en general, una función de tipo módulo.

---

## Operaciones del TAD

Las operaciones expuestas por el TAD en la implementación de cátedra son:

| Operación | Firma | Intención |
|---|---|---|
| Crear | `TablaHash th_crear(int tamano, int (*hash_function)(int))` | Crea una tabla de tamaño fijo con la función hash elegida. |
| Insertar | `bool th_insertar(TablaHash, TipoElemento)` | Inserta un elemento si la clave no existe. |
| Eliminar | `bool th_eliminar(TablaHash, int clave)` | Elimina la clave si está presente. |
| Recuperar | `TipoElemento th_recuperar(TablaHash, int clave)` | Busca por clave y devuelve el elemento o `NULL`. |
| Mostrar | `void th_mostrar(TablaHash)` | Muestra todas las posiciones (ocupadas y libres). |
| Mostrar ocupados | `void th_mostrar_solo_ocupados(TablaHash)` | Muestra solo posiciones con contenido. |

---

## Colisiones

Hay colisión cuando dos claves distintas producen la misma posición:

$$
h(k_1) = h(k_2), \quad k_1 \ne k_2
$$

Las colisiones no son un error: son parte normal del diseño. Lo importante es cómo resolverlas.

---

## Estrategia 1 - Lista de colisiones (encadenamiento)

Cada celda principal de la tabla guarda un elemento y además una lista con los que colisionan en ese mismo índice.

Idea general:

1. Se calcula la posición con la función hash.
2. Si la posición está libre, se inserta allí.
3. Si está ocupada por otra clave, se agrega en la lista de colisiones de esa posición.

Ventajas:

- Soporta bien factores de carga altos.
- La eliminación es simple (borrar de la lista o reemplazar cabecera).

Costo esperado:

- Inserción/búsqueda/eliminación: promedio cercano a O(1), peor caso O(n).

---

## Estrategia 2 - Zona de overflow

Se usa una tabla principal y una segunda zona auxiliar (overflow) de tamaño fijo para guardar elementos que colisionan.

Idea general:

1. Se calcula la posición en la tabla principal.
2. Si está libre, se inserta ahí.
3. Si hay colisión, se busca lugar libre en la zona de overflow.

Ventajas:

- Implementación directa para visualizar colisiones.
- Estructura simple para prácticas y trazas de ejecución.

Limitaciones:

- Si la zona de overflow se llena, no se puede insertar más aunque la tabla principal tenga lugares ocupados de otra forma.
- En recuperación/eliminación puede requerir recorrido lineal de la zona de overflow.

Costo esperado:

- Inserción/búsqueda/eliminación: promedio cercano a O(1) con baja ocupación, peor caso O(n).

---

## Función hash y factor de carga

El rendimiento depende mucho de dos decisiones:

- Función hash: debe distribuir claves de manera uniforme.
- Tamaño de tabla: conviene elegirlo en relación con la cantidad estimada de elementos (suele ayudar usar tamaños primos).

Factor de carga:

$$
\alpha = \frac{n}{m}
$$

donde $n$ es la cantidad de elementos y $m$ la cantidad de posiciones de la tabla principal.

Si $\alpha$ crece demasiado, aumentan las colisiones y empeoran los tiempos.

---

## Mini ejemplo

Si $h(x) = x \bmod 10$ y se insertan:

$$
(631, 130, 611, 417, 534, 965, 394)
$$

las posiciones base son:

- 631 -> 1
- 130 -> 0
- 611 -> 1 (colisión con 631)
- 417 -> 7
- 534 -> 4
- 965 -> 5
- 394 -> 4 (colisión con 534)

En lista de colisiones, las claves que chocan cuelgan en la lista del índice. En zona de overflow, van al arreglo auxiliar.

---

## ¿Cuándo conviene usar Tabla Hash?

Conviene cuando se necesita búsqueda por clave muy rápida y no hace falta mantener ordenados los elementos.

Ejemplos típicos:

- Índices en memoria para acceder a registros de archivo por código.
- Diccionarios y tablas de símbolos.
- Cache de resultados por clave.

Si además se requiere recorrido ordenado por clave, un ABB/AVL puede ser mejor opción.