import { LightningElement, wire } from 'lwc';
import getMovies from '@salesforce/apex/IMDBController.getMovies';

export default class MoviesList extends LightningElement {
    movies = [];
    searchText = '';
    selectedMovieId = '';
    isLoading = true;

    @wire(getMovies, { searchText: '$searchText' })
    wiredGetMovies(result) {
        if (result.data) {
            let data = JSON.parse(result.data);
            this.movies = data.success ? data.result : [];
        }
        else if (result.error) {
            console.log('Error occured while searching movies -' + result.error);
        }
        this.selectedMovieId = '';
        this.isLoading = false;
    }

    searchClickHandler(event) {
        this.isLoading = true;
        this.searchText = this.refs.searchInput?.value;
    }

    get showEnterSearchText() {
        return !this.searchText && this.movies == 0;
    }

    get noMoviesFound() {
        return this.searchText && this.movies == 0 && !this.isLoading;
    }

    viewDetailsClickHandler(event) {
        let movieId = event.target.dataset.movieId;
        this.selectedMovieId = movieId;
        window.scrollTo(0, 0);
    }
}