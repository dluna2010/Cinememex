class ShoppingCart {
    constructor() {
        this.movies = [];
    }

    // Agregar película al carrito
    addItem(movie, amount) {
        const existingMovieIndex = this.movies.findIndex(p => p.uuid === movie.uuid);
        if (existingMovieIndex !== -1) {
            this.movies[existingMovieIndex].amount += amount;
        } else {
            this.movies.push({
                ...movie,
                amount: amount
            });
        }
    }


    // Obtener todos los películas del carrito
    getAllItems() {
        return this.movies;
    }

    // Vaciar el carrito
    clearCart() {
        this.movies = [];
    }

    //Arreglar esta función
    // Calcular el total
    calculateTotal() {
        return this.movies.reduce((total, movie) => total + (movie.price * movie.amount), 0);
    }
}

// Exportar la clase ShoppingCart para su uso externo
module.exports = ShoppingCart;