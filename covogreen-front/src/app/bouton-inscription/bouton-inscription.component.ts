/*
    Auteur : Mohamed El Karmoudi
*/
import { Component, OnInit, Input  } from '@angular/core';
import {InscriptionTrajetService} from '../../services/inscription-trajet.service';
import {Response} from '@angular/http';
import {TrajetEnt} from "../../class/TrajetEnt";

@Component({
  selector: 'app-bouton-inscription',
  templateUrl: './bouton-inscription.component.html',
  styleUrls: ['./bouton-inscription.component.css'],
  providers: [InscriptionTrajetService]
})
export class BoutonInscriptionComponent implements OnInit {
  	@Input() idTrajet: number;
  	inscrit: boolean;
  	messages: string[];

  	@Input() offre: TrajetEnt;

  	constructor( private inscriptionService: InscriptionTrajetService ) { }

	ngOnInit() {
  		this.verifUserInscription();
  	}

  	/**
  	*	Envoi une requete vers le backend pour inscrire l'utilisateur connecté au trajet X
  	*/
  	inscriptionTrajet(){
	  	// requete vers le back pour s'inscrire au trajet X
  		this.inscriptionService.inscription(this.idTrajet).subscribe((res: Response) => { // on récupère la réponse.
        	// on vérifie la variable success
			if(res["success"] === true){
                this.inscrit = true;
                // On modifie le nombre de place.
                this.offre.nombre_place_disponible--;
			}else{
				this.messages = res["message"];
			}
    	});
  	}

  	/**
  	*	Envoi une requete vers le backend pour desinscrire l'utilisateur connecté au trajet X
  	*/
  	desinscriptionTrajet(){
  		// requete vers le back pour se désinscrire au trajet x
  		this.inscriptionService.desinscriptionTrajet(this.idTrajet).subscribe((res: Response) => { // on récupère la réponse.// on vérifie la variable success
            if(res["success"] === true){
                this.inscrit = false;
                // On modifie le nombre de place.
                this.offre.nombre_place_disponible++;
            }else{
                this.messages = res["message"];
            }
    	});
	}


  	/**
  	*	Envoi une requete vers le backend pour déterminer si l'utilisateur X est inscrit au trajet Y.
  	*/
    verifUserInscription(){
        this.inscriptionService.verifInscription(this.idTrajet).subscribe( (res: Response) => {
        	this.inscrit = (res["success"] === false) ? true : false ;
        });
    }

    isCreaterOfJourney() {

    }
}
