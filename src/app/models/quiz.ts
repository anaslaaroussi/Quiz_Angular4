export interface Quiz {

  $key ?: string;
  categorie ?: string;

  questions : {

    id ?: number;
    question ?: string;
    answer?: string;

  }
}


