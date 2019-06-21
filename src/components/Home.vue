<template>
    <div>
        <h1>{{ title }}</h1>
        <h3>{{ tema }}</h3>
        <b-container>
            <b-row>
                <b-col cols="3">
                    
                </b-col>
                <b-col >
                    <b-form inline id="formDistintivo">
                        {{distintivo}}
                        <b-form-input
                            id="input-2"
                            v-model="distintivo"
                            placeholder="Pega tu distintivo Aqui"
                        ></b-form-input>
                        <!--<b-button v-on:click="guardarDistintivo" variant="primary">Subir</b-button>-->
                    </b-form>
                    <b-list-group >
                        <b-list-group-item button v-on:click="abrirDinamica('acrosticoCruzado')">ACRÓSTICO CRUZADO</b-list-group-item>
                        <b-list-group-item button v-on:click="abrirDinamica('stop')">STOP</b-list-group-item>
                        <b-list-group-item button v-on:click="abrirDinamica('acrosticoMagico')">ACRÓSTICO MÁGICO</b-list-group-item>
                        <b-list-group-item button v-on:click="abrirDinamica('yElEmoticon')">¿Y EL EMOTICON?</b-list-group-item>
                        <b-list-group-item button v-on:click="abrirDinamica('dinamicaAhorcados')">DINÁMICA AHORCADOS</b-list-group-item>
                        <!--<b-list-group-item button v-on:click="abrirDinamica('abcMagico')">"ABC" Mágico</b-list-group-item>    
                        <b-list-group-item button v-on:click="abrirDinamica('noEsta')">NO ESTÁ</b-list-group-item>-->                             
                    </b-list-group>
                </b-col>
                <b-col cols="3">
                    
                </b-col>
            </b-row>
        </b-container>
        <b-modal ref="modalAcrosticoCruzado" hide-footer title="Acróstico Cruzado">
            <div class="d-block text-center">
                <b-form-radio-group
                class="pt-2"
                :options="['Personaje', 'Ciudad/Pais']"
                v-model="acrosticoCruzado.tipoEntrada"
                ></b-form-radio-group>
                <b-form-input
                    id="nombreAcrosticoCruzado"
                    v-model="acrosticoCruzado.entradaTexto"
                    placeholder="Entrada de texto"
                    v-on:keyup.enter="realizarAcrosticoCruzado"
                    v-on:keyup="mayus('acrosticoCruzado')"
                    autocomplete="off"
                ></b-form-input>
                <b-form-textarea
                    id="acrosticoCruzadoExit"
                    plaintext :value="acrosticoCruzadoHTML"
                    rows="5"
                ></b-form-textarea>
            </div>
             <b-button class="mt-3" variant="outline-info" block @click="copiarAlPortapeles('acrosticoCruzadoExit')">Copiar al Portapapeles</b-button>
            <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Cerrar</b-button>
        </b-modal>
        <b-modal ref="modalStop" hide-footer title="Stop">
            <div class="d-block text-center">
                <b-form-input
                    id="letrasStop"
                    v-model="stop.entradaTexto"
                    placeholder="Entrada de texto"
                    v-on:keyup.enter="realizarStop"
                    v-on:keyup="mayus('stop')"
                    autocomplete="off"
                ></b-form-input>
                <b-form-textarea
                    id="stopExit"
                    plaintext :value="stopHTML"
                    rows="5"
                ></b-form-textarea>
            </div>
            <b-button class="mt-3" variant="outline-info" block @click="copiarAlPortapeles('stopExit')">Copiar al Portapapeles</b-button>
            <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Cerrar</b-button>
        </b-modal>
        <b-modal ref="modalAcrosticoMagico" hide-footer title="Acróstico Mágico">
            <div class="d-block text-center">
                <b-form-input
                    id="palabraAcrosticoMagico"
                    v-model="acrosticoMagico.entradaTexto"
                    placeholder="Entrada de texto"
                    v-on:keyup.enter="realizarAcrosticoMagico"
                    v-on:keyup="mayus('acrosticoMagico')"
                    autocomplete="off"
                ></b-form-input>
                 <b-form-textarea
                    id="acrosticoMagicoExit"
                    plaintext :value="acrosticoMagicoHTML"
                    rows="4"
                ></b-form-textarea>
            </div>
            <b-button class="mt-3" variant="outline-info" block @click="copiarAlPortapeles('acrosticoMagicoExit')">Copiar al Portapapeles</b-button>
            <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Cerrar</b-button>
        </b-modal>
        <b-modal ref="modalYElEmoticon" hide-footer title="Y Él Emoticón">
            <div class="d-block text-center">
                <b-form-input
                    id="palabraYElEmoticon"
                    v-model="yElEmoticon.entradaTexto"
                    placeholder="Entrada de texto"
                    v-on:keyup.enter="realizarYElEmoticon"
                    v-on:keyup="mayus('palabraYElEmoticon')"
                    autocomplete="off"
                ></b-form-input>
                <b-form-textarea
                    id="palabraYElEmoticonExit"
                    plaintext :value="yElEmoticonHTML"
                    rows="3"
                ></b-form-textarea>
            </div>
            <b-button class="mt-3" variant="outline-info" block @click="copiarAlPortapeles('palabraYElEmoticonExit')">Copiar al Portapapeles</b-button>
            <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Cerrar</b-button>
        </b-modal>
        <b-modal ref="modalDinamicaAhorcados" hide-footer title="Dinámica Ahorcados">
            <div class="d-block text-center">
                <b-container>
                    <b-row>
                        <b-col cols="8">
                            <b-form inline>
                            <b-form-input
                                id="ahorcadosPrimerNumero"
                                class="inputsNumbers"
                                v-model="dinamicaAhorcados.entradaPrimero"
                                autocomplete="off"
                                type=number
                            ></b-form-input>
                            <b-form-input
                                id="ahorcadosSegundoNumero"
                                class="inputsNumbers"
                                v-model="dinamicaAhorcados.entradaSegundo"
                                autocomplete="off"
                                type=number
                            ></b-form-input>
                        </b-form>
                        </b-col>
                        <b-col cols="4">
                            <b-button v-on:click="realizarDinamicaAhorcados" variant="primary">Buscar</b-button>
                        </b-col>
                    </b-row>
                </b-container>
                <br/>
                <b-form-textarea
                    id="dinamicaAhorcadosExit"
                    plaintext :value="dinamicaAhorcadosHTML"
                    rows="4"
                ></b-form-textarea>
            </div>
            <b-button class="mt-3" variant="outline-info" block @click="copiarAlPortapeles('dinamicaAhorcadosExit')">Copiar al Portapapeles</b-button>
            <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Cerrar</b-button>
        </b-modal>        
    </div>
</template>

<script>
import personajes from '../data/personajes'
import ciudadesPaises from '../data/ciudadesPaises'
import hechizosJSON from '../data/hechizos'
import criaturasJSON from '../data/criaturas'
import emoticonesJSON from '../data/emoticones'

export default {
    name: 'Home',
    data () {
    return {
        title: 'Hogwart Army',
        tema: 'Dinámicas',
        selected: 'first',
        acrosticoCruzado:{
            entradaTexto:'',
            tipoEntrada:'Personaje',
            salidaAcrostico:''
        },
        stop:{
            entradaTexto:'',
            salidaAcrostico:''
        },
        acrosticoMagico:{
            entradaTexto:'',
            salidaAcrostico:''
        },
        yElEmoticon:{
            entradaTexto:'',
            salidaAcrostico:''
        },
        dinamicaAhorcados:{
            entradaPrimero:'',
            entradaSegundo:''
        },
        acrosticoCruzadoHTML: ``,
        stopHTML: ``,
        acrosticoMagicoHTML: ``,
        yElEmoticonHTML: ``,
        dinamicaAhorcadosHTML:``,
        distintivo:''
        }
  },
  methods:{
      copiarAlPortapeles(id_elemento){
            let aux= document.getElementById(id_elemento);
            console.log(aux.value)
            aux.select();
            document.execCommand("copy");
      },
      realizarAcrosticoCruzado(){
        let caracteres = this.acrosticoCruzado.entradaTexto.split("");
        let salida=[];
        let esPersonaje = true;
        ciudadesPaises.forEach(e => {
            let pais = e.translations.es;
            let ciudad = e.capital;
            if(e.translations.es !== null){
                if(this.acrosticoCruzado.entradaTexto === pais.toUpperCase() || this.acrosticoCruzado.entradaTexto === ciudad.toUpperCase()){
                    esPersonaje = false;
                }
            }
        });
        if(esPersonaje){
            this.acrosticoCruzado.tipoEntrada = 'Personaje'
            let ciudadesLetras=[];
            for(let i = 0;i<caracteres.length;i++){
                ciudadesLetras=[];
                for(let j=0;j<ciudadesPaises.length;j++){
                    let traduccion = ciudadesPaises[j].translations.es;
                    if(traduccion !== null)
                    if(traduccion.charAt(0) === caracteres[i] ){
                        ciudadesLetras.push(traduccion);
                    }
                    /*else if(ciudadesPaises[j].capital.charAt(0) === caracteres[i]){
                        ciudadesLetras.push(ciudadesPaises[j].capital);
                    }*/
                }
                salida.push(ciudadesLetras[Math.floor(Math.random() * ciudadesLetras.length)])
            }
        }else{
            this.acrosticoCruzado.tipoEntrada = 'Ciudad/Pais'
            let personajesDeLetras=[];
            for(let i = 0;i<caracteres.length;i++){
                personajesDeLetras=[];
                for(let j=0;j<personajes.length;j++){
                    if(personajes[j].nombre.charAt(0) === caracteres[i]){
                        personajesDeLetras.push(personajes[j].nombre);
                    }
                }
                salida.push(personajesDeLetras[Math.floor(Math.random() * personajesDeLetras.length)])
            }
        }
        this.acrosticoCruzadoHTML = this.distintivo+'\n';
        for(let i = 0; i<salida.length;i++){
            if(salida[i] === undefined || salida[i] === 'undefined'){
                this.acrosticoCruzadoHTML = this.acrosticoCruzadoHTML + `\n`;
            }else{
                this.acrosticoCruzadoHTML = this.acrosticoCruzadoHTML + `${salida[i]}\n`;
            }
        }
      },
      realizarStop(){
          let caracteres = this.stop.entradaTexto.split("");
          let salida=[];
          let nombres=[];
          let apellidos=[];
          let hechizos=[];
          let criaturas=[];
          for(let i = 0;i<caracteres.length;i++){
                nombres=[];
                apellidos=[];
                hechizos=[];
                criaturas=[];
                for(let j=0;j<personajes.length;j++){
                    if(personajes[j].nombre.charAt(0) === caracteres[i]){
                        nombres.push(personajes[j].nombre);
                    }
                }
                for(let j=0;j<personajes.length;j++){
                    if(personajes[j].apellido.charAt(0) === caracteres[i]){
                        apellidos.push(personajes[j].apellido);
                    }
                }
                for(let j=0;j<hechizosJSON.length;j++){
                    if(hechizosJSON[j].nombre.charAt(0) === caracteres[i]){
                        hechizos.push(hechizosJSON[j].nombre);
                    }
                }
                for(let j=0;j<criaturasJSON.length;j++){
                    if(criaturasJSON[j].nombre.charAt(0) === caracteres[i]){
                        criaturas.push(criaturasJSON[j].nombre);
                    }
                }
                salida.push(nombres[Math.floor(Math.random() * nombres.length)])
                salida.push(apellidos[Math.floor(Math.random() * apellidos.length)])
                salida.push(hechizos[Math.floor(Math.random() * hechizos.length)])
                salida.push(criaturas[Math.floor(Math.random() * criaturas.length)])
            }
            this.stopHTML = this.distintivo+'\n';
            for(let i = 0; i<salida.length;i++){
                if(salida[i] === undefined || salida[i] === 'undefined'){
                    this.stopHTML = this.stopHTML + `\n`;
                }else{
                    this.stopHTML = this.stopHTML + `${salida[i]}\n`;
                }
            }
      },
      realizarAcrosticoMagico(){
        let caracteres = this.acrosticoMagico.entradaTexto.split("");
        let salida=[];
        let totalLetras=[];
        for(let i = 0;i<caracteres.length;i++){
            totalLetras=[];
            for(let j=0;j<personajes.length;j++){
                if(personajes[j].nombre.charAt(0) === caracteres[i]){
                    totalLetras.push(personajes[j].nombre);
                }
            }
            for(let j=0;j<personajes.length;j++){
                if(personajes[j].apellido.charAt(0) === caracteres[i]){
                    totalLetras.push(personajes[j].apellido);
                }
            }
            for(let j=0;j<criaturasJSON.length;j++){
                if(criaturasJSON[j].nombre.charAt(0) === caracteres[i]){
                    totalLetras.push(criaturasJSON[j].nombre);
                }
            }
            for(let j=0;j<hechizosJSON.length;j++){
                if(hechizosJSON[j].nombre.charAt(0) === caracteres[i]){
                    totalLetras.push(hechizosJSON[j].nombre);
                }
            }
            salida.push(totalLetras[Math.floor(Math.random() * totalLetras.length)])
        }
        console.log(salida)
        this.acrosticoMagicoHTML = this.distintivo+'\n';
        for(let i = 0; i<salida.length;i++){
            if(salida[i] === undefined || salida[i] === 'undefined'){
                this.acrosticoMagicoHTML = this.acrosticoMagicoHTML+'\n';
            }else{
                this.acrosticoMagicoHTML = this.acrosticoMagicoHTML + `${salida[i]}\n`;
            }
        }
      },
      realizarYElEmoticon(){
          let caracteres = this.yElEmoticon.entradaTexto.split("");
          let salida=[];
          let totalEmoticones = [];
          for(let i = 0;i<caracteres.length;i++){
            totalEmoticones=[];
            for(let j=0;j<emoticonesJSON.length;j++){
                if(emoticonesJSON[j].nombre.charAt(0) === caracteres[i]){
                    totalEmoticones.push(emoticonesJSON[j].emoticon);
                }
            }
            salida.push(totalEmoticones[Math.floor(Math.random() * totalEmoticones.length)])
          }
          this.yElEmoticonHTML= this.distintivo+'\n';
        for(let i = 0; i<salida.length;i++){
             if(salida[i] === undefined || salida[i] === 'undefined'){
                this.yElEmoticonHTML = this.yElEmoticonHTML + `\n`;
             }else{
                 this.yElEmoticonHTML = this.yElEmoticonHTML + `${salida[i]} `;
             }
        }
      },
      realizarDinamicaAhorcados(){
          this.dinamicaAhorcadosHTML= this.distintivo+'\n';
          let salida=[];
          personajes.forEach(e => {
              if(e.nombre.length.toString() === this.dinamicaAhorcados.entradaPrimero){
                  if(e.apellido.length.toString() === this.dinamicaAhorcados.entradaSegundo){
                      salida.push(e);
                  }
              }
          });
          salida.forEach(e =>{
              this.dinamicaAhorcadosHTML = this.dinamicaAhorcadosHTML + e.nombre + ' ' + e.apellido +`\n`;
          })
      },
      abrirDinamica (tipo){
            console.log(tipo)
            this.showModal(tipo);
      },
      showModal(tipo) {
        switch (tipo) {
                case 'acrosticoCruzado':
                    this.$refs['modalAcrosticoCruzado'].show()
                    break;
                case 'stop':
                    this.$refs['modalStop'].show()
                    break;
                case 'acrosticoMagico':
                    this.$refs['modalAcrosticoMagico'].show()
                    break;
                case 'yElEmoticon':
                    this.$refs['modalYElEmoticon'].show()
                    break;
                case 'dinamicaAhorcados':
                    this.$refs['modalDinamicaAhorcados'].show()
                    break;
          }
      },
      hideModal() {
        this.$refs['modalAcrosticoCruzado'].hide()
        this.$refs['modalStop'].hide()
        this.$refs['modalAcrosticoMagico'].hide()
        this.$refs['modalYElEmoticon'].hide()
        this.$refs['modalDinamicaAhorcados'].hide()
        this.acrosticoCruzado.entradaTexto='';
        this.stop.entradaTexto='';
        this.acrosticoMagico.entradaTexto = '';
        this.yElEmoticon.entradaTexto = '';
      },
      guardarDistintivo(){

      },
      mayus(id) {
            if(id==='acrosticoCruzado'){
                this.acrosticoCruzado.entradaTexto = this.acrosticoCruzado.entradaTexto.toUpperCase();
                let caracteres = this.acrosticoCruzado.entradaTexto.split("");
                for(let i=0;i<caracteres.length;i++){
                    if(caracteres[i]=== 'Á'){
                        caracteres[i] = 'A';
                    }
                    if(caracteres[i]=== 'É'){
                        caracteres[i] = 'E';
                    }
                    if(caracteres[i]=== 'Í'){
                        caracteres[i] = 'I';
                    }
                    if(caracteres[i]=== 'Ó'){
                        caracteres[i] = 'O';
                    }
                    if(caracteres[i]=== 'Ú'){
                        caracteres[i] = 'U';
                    }
                }
                let sinTildes = caracteres.toString().replace(/,/g, '');
                this.acrosticoCruzado.entradaTexto = sinTildes;
                this.realizarAcrosticoCruzado();
            }
            if(id==='stop'){
                this.stop.entradaTexto = this.stop.entradaTexto.toUpperCase();
                this.realizarStop();
            }
            if(id==='acrosticoMagico'){
                this.acrosticoMagico.entradaTexto = this.acrosticoMagico.entradaTexto.toUpperCase();
                this.realizarAcrosticoMagico();
            }
            if(id==='palabraYElEmoticon'){
                this.yElEmoticon.entradaTexto = this.yElEmoticon.entradaTexto.toUpperCase();
                let caracteres = this.yElEmoticon.entradaTexto.split("");
                for(let i=0;i<caracteres.length;i++){
                    if(caracteres[i]=== 'Á'){
                        caracteres[i] = 'A';
                    }
                    if(caracteres[i]=== 'É'){
                        caracteres[i] = 'E';
                    }
                    if(caracteres[i]=== 'Í'){
                        caracteres[i] = 'I';
                    }
                    if(caracteres[i]=== 'Ó'){
                        caracteres[i] = 'O';
                    }
                    if(caracteres[i]=== 'Ú'){
                        caracteres[i] = 'U';
                    }
                }
                let sinTildes = caracteres.toString().replace(/,/g, '');
                this.yElEmoticon.entradaTexto = sinTildes;
                this.realizarYElEmoticon();
            }
        }
  }
}
</script>

<style>
#formDistintivo{
    text-align: center;
    display: inline-block;
    margin-bottom: 10px;
}
</style>


