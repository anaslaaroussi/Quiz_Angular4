export interface Quiz {

  $key ?: string;
  categorie ?: string;

  questions : Questions[]
}

export interface Questions {

  id ?: number;
  question ?: string;
  answer?: string;

}


