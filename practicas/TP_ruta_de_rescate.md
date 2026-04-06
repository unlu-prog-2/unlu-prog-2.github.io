# Trabajo Práctico Integrador: Ruta de Rescate en Mina

## Objetivo

Implementar un programa que resuelva un mapa en grilla, encontrando recursivamente un camino desde un punto de inicio hasta una salida.

El trabajo integra contenidos de repaso y recursividad:

- Structs
- Punteros
- Manejo de archivos
- Recursividad
- Manejo de memoria dinámica

## Descripción

El programa debe leer un mapa desde un archivo de entrada, calcular la mejor ruta posible y escribir el resultado en un archivo de salida.

La búsqueda debe hacerse de forma recursiva, explorando alternativas hasta encontrar la mejor solución según las reglas del enunciado.

## Reglas del problema

En el mapa hay:

- Un inicio, representado por `I`
- Una salida, representada por `S`
- Celdas bloqueadas, representadas por `#`
- Celdas libres, representadas por `.`
- Celdas con tesoro, representadas por dígitos `0` a `9` (su valor suma puntaje)

Se puede mover en 4 direcciones:

- Arriba
- Derecha
- Abajo
- Izquierda

Restricciones:

- No se puede salir de la grilla
- No se puede pasar por celdas bloqueadas
- No se puede visitar dos veces la misma celda dentro de un mismo camino

## Criterio para elegir la mejor ruta

Entre todas las rutas válidas de `I` a `S`, se elige:

1. La de mayor puntaje total recolectado.
2. Si hay empate, la de menor cantidad de pasos.
3. Si persiste el empate, la de menor secuencia de movimientos en orden lexicográfico.

Para que el resultado sea determinístico y fácil de testear, usar este orden lexicográfico de movimientos:

- `A` = Arriba
- `B` = Abajo
- `D` = Derecha
- `I` = Izquierda

## Formato de entrada

El archivo de entrada contendrá:

1. Primera línea: `filas columnas`
2. Luego, `filas` líneas con exactamente `columnas` caracteres cada una

Caracteres permitidos dentro de la grilla:

- `I`, `S`, `#`, `.`, `0` a `9`

Condiciones esperadas del archivo:

- Debe existir exactamente un `I`
- Debe existir exactamente un `S`

### Ejemplo de entrada

```text
6 7
I2..#..
.#3.#S.
..#..#.
1..4...
.##..5.
...#...
```

## Formato de salida

Si existe al menos un camino válido:

```text
RESULTADO: ENCONTRADO
PUNTAJE: <puntaje_total>
PASOS: <cantidad_de_pasos>
MOVIMIENTOS: <secuencia>
CAMINO: (f1,c1) -> (f2,c2) -> ... -> (fk,ck)
```

Si no existe camino:

```text
RESULTADO: SIN_CAMINO
```

Convenciones:

- Las coordenadas son base 1 (fila y columna comienzan en 1)
- `PASOS` es la cantidad de movimientos, por lo tanto si el camino tiene `k` posiciones, entonces pasos = `k - 1`

## Requisitos

1. Leer el problema desde archivo de entrada.
2. Resolverlo usando una estrategia recursiva de exploración de caminos.
3. Escribir el resultado en archivo de salida con el formato exacto.
4. Usar memoria dinámica para la grilla y estructuras auxiliares.
5. Liberar correctamente toda la memoria utilizada.
6. Manejar errores de apertura y lectura de archivos.

## Sugerencia de estructuras

Se recomienda una organización similar a la siguiente:

```c
struct Posicion {
    unsigned int fila;
    unsigned int columna;
};

struct Mapa {
    char **celdas;
    int filas;
    int columnas;
    struct Posicion inicio;
    struct Posicion salida;
};

struct Solucion {
    bool encontrada;
    int puntaje;
    int pasos;
    char *movimientos;
    struct Posicion *camino;
    int largo_camino;
};
```

## Comparación de archivos

A la hora de escribir las aserciones, el archivo generado debe ser igual al archivo esperado. Para ello, pueden usar esta función:

```c
bool file_eq(const char *archivo_esperado, const char *archivo_generado) {
    FILE *esperado = fopen(archivo_esperado, "r");
    FILE *generado = fopen(archivo_generado, "r");

    if (!esperado || !generado) {
        if (esperado) fclose(esperado);
        if (generado) fclose(generado);
        return false;
    }

    char linea_esperada[256];
    char linea_generada[256];
    bool son_iguales = true;

    while (fgets(linea_esperada, sizeof(linea_esperada), esperado) != NULL) {
        if (fgets(linea_generada, sizeof(linea_generada), generado) == NULL) {
            son_iguales = false;
            break;
        }

        if (strcmp(linea_esperada, linea_generada) != 0) {
            son_iguales = false;
            break;
        }
    }

    if (fgets(linea_generada, sizeof(linea_generada), generado) != NULL) {
        son_iguales = false;
    }

    fclose(esperado);
    fclose(generado);
    return son_iguales;
}
```

## Ejemplo de test

```c
int main() {
    imprimir_titulo("TP Integrador - Ruta de Rescate en Mina");

    resolver_ruta_mina("archivos/prueba1_entrada.txt", "archivos/prueba1_salida.txt");
    assert(file_eq("archivos/prueba1_salida_esperada.txt", "archivos/prueba1_salida.txt"));

    resolver_ruta_mina("archivos/prueba2_entrada.txt", "archivos/prueba2_salida.txt");
    assert(file_eq("archivos/prueba2_salida_esperada.txt", "archivos/prueba2_salida.txt"));

    return 0;
}
```

## Archivos de prueba

Se recomienda incluir al menos estos casos:

- Caso base con una ruta clara
- Caso sin camino posible
- Caso con múltiples rutas que empaten en puntaje y requieran desempate por pasos
- Caso con empate en puntaje y pasos que requiera desempate lexicográfico

Los archivos deben colocarse dentro de la carpeta `archivos` de la práctica de recursividad.

Agregar debajo de `enable_testing()` en el archivo CMakeLists.txt:

```cmake
# Copiar los archivos de datos
file(GLOB DATA_FILES "archivos/*.txt")
foreach (DATA_FILE ${DATA_FILES})
    get_filename_component(FILE_NAME ${DATA_FILE} NAME)
    configure_file(${DATA_FILE} archivos/${FILE_NAME} COPYONLY)
endforeach ()
```

## Evaluación

El trabajo será evaluado según:

1. Correctitud: debe resolver correctamente al menos los casos de prueba provistos.
2. Estructura del código: organización, legibilidad y modularidad.
3. Manejo de memoria: uso correcto de memoria dinámica.
4. Robustez: validación de archivo y manejo de errores.

## Entrega

- El código fuente dentro de la práctica de recursividad.
- Crear un archivo nuevo: `test_tp_ruta_mina.c`.
- Incluir tests automáticos con comparación de archivos.
- Debe correr en GitHub Actions y pasar todos los tests.

## Fecha de entrega

Según lo indicado en la guía de trabajos prácticos.

## Notas

- Se recomienda empezar por instancias pequeñas.
- Separar en funciones: lectura, resolución recursiva, escritura y liberación de memoria.
- Verificar cuidadosamente condiciones de corte recursivo.
