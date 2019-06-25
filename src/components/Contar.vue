<template>
    <div>
        <img id = "logo" src="../assets/Hogwartscrest.png">
        <h2>{{ title }}</h2>
        <b-container>
            <b-row>
                <b-col cols="1">
                    
                </b-col>
                <b-col cols="10">
                    <div>
                        <b-container>
                            <b-row>
                                <b-col cols="6">
                                    <b-form inline>
                                        <b-container>
                                            <b-row>
                                                <b-col cols="7">
                                                    <label>1er Puesto</label>
                                                </b-col>
                                                 <b-col cols="5">
                                                     <b-form-input
                                                        id="primerPuesto"
                                                        class="w-100"
                                                        v-model="puntajesPuesto.primerPuesto"
                                                        placeholder=""
                                                        :disabled=isDisabled
                                                    ></b-form-input>
                                                </b-col>
                                            </b-row>
                                        </b-container>
                                    </b-form>
                                    <b-form inline>
                                        <b-container>
                                            <b-row>
                                                <b-col cols="7">
                                                    <label>2do Puesto</label>
                                                </b-col>
                                                 <b-col cols="5">
                                                     <b-form-input
                                                        id="segundoPuesto"
                                                        class="w-100"
                                                        v-model="puntajesPuesto.segundoPuesto"
                                                        placeholder=""
                                                        :disabled=isDisabled
                                                    ></b-form-input>
                                                </b-col>
                                            </b-row>
                                        </b-container>
                                    </b-form>
                                    <b-form inline>
                                       <b-container>
                                            <b-row>
                                                <b-col cols="7">
                                                    <label>Demás</label>
                                                </b-col>
                                                 <b-col cols="5">
                                                     <b-form-input
                                                        id="tercerPuntaje"
                                                        class="w-100"
                                                        v-model="puntajesPuesto.tercerPuesto"
                                                        placeholder=""
                                                        :disabled=isDisabled
                                                    ></b-form-input>
                                                </b-col>
                                            </b-row>
                                        </b-container>
                                    </b-form>
                                    <br/>
                                    <b-button pill  size="sm" variant="outline-info" block @click="guardarPuntaje">GUARDAR</b-button>
                                </b-col>
                                <b-col cols="6">
                                    <div>
                                        <label>{{rondas}} Ronda</label>
                                    </div>
                                   <div>
                                       <b-container>
                                            <b-row>
                                                <b-col cols="3">
                                                    <label>🧡</label>
                                                    <b-button pill  size="sm" variant="outline-info" block @click="aumentarPuntajeRondaGryff">+</b-button>
                                                    <b-button pill  size="sm" variant="outline-info" block @click="disminuirPuntajeRondaGryff">-</b-button>
                                                    <label>{{ronda.gryff}} {{ganador.gryff}}</label>
                                                </b-col>
                                                <b-col cols="3">
                                                    <label>💙</label>
                                                    <b-button pill  size="sm" variant="outline-info" block @click="aumentarPuntajeRondaRaven">+</b-button>
                                                    <b-button pill  size="sm" variant="outline-info" block @click="disminuirPuntajeRondaRaven">-</b-button>
                                                    <label>{{ronda.raven}} {{ganador.raven}}</label>
                                                </b-col>
                                                <b-col cols="3">
                                                    <label>💚</label>
                                                    <b-button pill  size="sm" variant="outline-info" block @click="aumentarPuntajeRondaSly">+</b-button>
                                                    <b-button pill  size="sm" variant="outline-info" block @click="disminuirPuntajeRondaSly">-</b-button>
                                                    <label>{{ronda.sly}} {{ganador.sly}}</label>
                                                </b-col>
                                                <b-col cols="3">
                                                    <label>💛</label>
                                                    <b-button pill  size="sm" variant="outline-info" block @click="aumentarPuntajeRondaHuff">+</b-button>
                                                    <b-button pill  size="sm" variant="outline-info" block @click="disminuirPuntajeRondaHuff">-</b-button>
                                                    <label>{{ronda.huff}} {{ganador.huff}}</label>
                                                </b-col>
                                            </b-row>
                                        </b-container>
                                        <b-button pill  size="sm" variant="outline-info" block @click="siguienteRonda">SIGUIENTE RONDA</b-button>
                                        <b-button size="sm" variant="outline-danger" block @click="ReiniciarTodo">REINICIAR</b-button>
                                   </div>
                                </b-col>
                            </b-row>
                        </b-container>
                    </div>
                    <br/>
                    <h4>Resumen</h4>
                    <b-table striped hover :items="rondasPuntos"></b-table>
                </b-col>
                <b-col cols="1">
                    
                </b-col>
            </b-row>
        </b-container>
    </div>

</template>
<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


export default {
    name: 'Contar',
    data () {
        return {
            title: 'Hogwart Army',
            rondas:1,
            puntajesPuesto:{
                primerPuesto:'50',
                segundoPuesto:'40',
                tercerPuesto:'30'
            },
            isDisabled:false,
            ronda:{
                gryff:0,
                raven:0,
                sly:0,
                huff:0
            },
            ganador:{
                gryff:'',
                raven:'',
                sly:'',
                huff:''
            },
            rondasPuntos:[]
        }
    },
    methods:{
        guardarPuntaje(){
            this.isDisabled = true;
        },
        siguienteRonda(){
            let primero;
            let segundo;
            if(this.Validar()===true){
                if(this.ronda.gryff === 0 && this.ronda.raven === 0 && this.ronda.sly === 0 && this.ronda.huff === 0){
                    alert("Puntajes en cero")
                }else{
                    if(this.ganador.gryff === '🥇'){
                        primero = 'Gryffindor'
                    }
                    if(this.ganador.gryff === '🥈'){
                        segundo = 'Gryffindor'
                    }
                    if(this.ganador.gryff === '🥇🥈'){
                        primero = 'Gryffindor'
                        segundo = 'Gryffindor'
                    }
                    if(this.ganador.raven === '🥇'){
                        primero = 'Ravenclaw'
                    }
                    if(this.ganador.raven === '🥈'){
                        segundo = 'Ravenclaw'
                    }
                    if(this.ganador.raven === '🥇🥈'){
                        primero = 'Ravenclaw'
                        segundo = 'Ravenclaw'
                    }
                    if(this.ganador.sly === '🥇'){
                        primero = 'Slytherin'
                    }
                    if(this.ganador.sly === '🥈'){
                        segundo = 'Slytherin'
                    }
                    if(this.ganador.sly === '🥇🥈'){
                        primero = 'Slytherin'
                        segundo = 'Slytherin'
                    }
                    if(this.ganador.huff === '🥇'){
                        primero = 'Hufflepuff'
                    }
                    if(this.ganador.huff === '🥈'){
                        segundo = 'Hufflepuff'
                    }
                    if(this.ganador.huff === '🥇🥈'){
                        primero = 'Hufflepuff'
                        segundo = 'Hufflepuff'
                    }
                    this.rondasPuntos.pop();
                    this.rondasPuntos.push({
                        ronda:this.rondas,
                        primero: primero,
                        segundo:segundo,
                        gryff:this.ronda.gryff,
                        raven:this.ronda.raven,
                        sly:this.ronda.sly,
                        huff:this.ronda.huff
                    })
                    this.rondas++;
                    this.ronda.gryff = 0;
                    this.ronda.raven = 0;
                    this.ronda.sly = 0;
                    this.ronda.huff = 0;
                    this.ganador.gryff = '';
                    this.ganador.raven ='';
                    this.ganador.sly = '';
                    this.ganador.huff = '';

                    let puntosTotalGryff = 0;
                    let puntosTotalRaven = 0;
                    let puntosTotalSly = 0;
                    let puntosTotalHuff = 0;

                    let puntosTotalGryffextra = 0;
                    let puntosTotalRavenextra = 0;
                    let puntosTotalSlyextra = 0;
                    let puntosTotalHuffextra = 0;

                    this.rondasPuntos.forEach(e=>{
                        puntosTotalGryff = puntosTotalGryff + e.gryff;
                        puntosTotalRaven = puntosTotalRaven + e.raven;
                        puntosTotalSly = puntosTotalSly + e.sly;
                        puntosTotalHuff = puntosTotalHuff + e.huff;
                        if(e.primero === 'Gryffindor'){
                            puntosTotalGryffextra = puntosTotalGryffextra + 20;
                        }
                        if(e.segundo === 'Gryffindor'){
                            puntosTotalGryffextra = puntosTotalGryffextra + 10;
                        }

                        if(e.primero === 'Ravenclaw'){
                            puntosTotalRavenextra = puntosTotalRavenextra + 20;
                        }
                        if(e.segundo === 'Ravenclaw'){
                            puntosTotalRavenextra = puntosTotalRavenextra + 10;
                        }

                        if(e.primero === 'Slytherin'){
                            puntosTotalSlyextra = puntosTotalSlyextra + 20;
                        }
                        if(e.segundo === 'Slytherin'){
                            puntosTotalSlyextra = puntosTotalSlyextra + 10;
                        }

                        if(e.primero === 'Hufflepuff'){
                            puntosTotalHuffextra = puntosTotalHuffextra + 20;
                        }
                        if(e.segundo === 'Hufflepuff'){
                            puntosTotalHuffextra = puntosTotalHuffextra + 10;
                        }
                    })

                    this.rondasPuntos.push({
                        ronda:'TOTAL',
                        primero: '',
                        segundo:'',
                        gryff:puntosTotalGryff*30 + puntosTotalGryffextra,
                        raven:puntosTotalRaven*30 + puntosTotalRavenextra,
                        sly:puntosTotalSly*30 + puntosTotalSlyextra,
                        huff:puntosTotalHuff*30 + puntosTotalHuffextra
                    })
                }
            }
        },
        Validar(){
            if(this.puntajesPuesto.primerPuesto === ''){
                alert("Poner el primer puntaje")
                return false;
            }else if(this.puntajesPuesto.segundoPuesto === ''){
                alert("Poner el segundo puntaje")
                return false;
            }else if(this.puntajesPuesto.tercerPuesto === ''){
                 alert("Poner el tercer puntaje")
                 return false;
            }else{
                return true;
            }
        },
        ReiniciarTodo(){
            this.rondasPuntos = [];
            this.rondas = 1;
            this.ronda.gryff = 0;
            this.ronda.raven = 0;
            this.ronda.sly = 0;
            this.ronda.huff = 0;
            this.ganador.gryff = '';
            this.ganador.raven ='';
            this.ganador.sly = '';
            this.ganador.huff = '';
        },
        aumentarPuntajeRondaGryff(){
            if(this.Validar()===true){
                let puntaje = this.ronda.huff + this.ronda.sly + this.ronda.raven;
                if(this.ronda.gryff === 0 && puntaje === 2){
                    this.ganador.gryff = '🥉'
                }
                if(this.ronda.gryff === 0 && puntaje === 1){
                    this.ganador.gryff = '🥈'
                }
                if(this.ronda.huff === 0 && this.ronda.sly === 0 && this.ronda.raven === 0){
                    this.ganador.gryff = '🥇'
                }
                if(this.ronda.huff === 0 && this.ronda.sly === 0 && this.ronda.raven === 0 && this.ronda.gryff === 1){
                    this.ganador.gryff = '🥇🥈'
                }
                this.ronda.gryff++;
            }
        },
        aumentarPuntajeRondaRaven(){
            if(this.Validar()===true){
                let puntaje = this.ronda.huff + this.ronda.sly + this.ronda.gryff;
                if(this.ronda.raven === 0 && puntaje === 2){
                    this.ganador.raven = '🥉'
                }
                if(this.ronda.raven === 0 && puntaje === 1){
                    this.ganador.raven = '🥈'
                }
                if(this.ronda.huff === 0 && this.ronda.sly === 0 && this.ronda.gryff === 0){
                    this.ganador.raven = '🥇'
                }
                if(this.ronda.huff === 0 && this.ronda.sly === 0 && this.ronda.gryff === 0 && this.ronda.raven === 1){
                    this.ganador.raven = '🥇🥈'
                }
                this.ronda.raven++;      
            }
        },
        aumentarPuntajeRondaSly(){
            if(this.Validar()===true){
                let puntaje = this.ronda.huff + this.ronda.raven + this.ronda.gryff;
                if(this.ronda.sly === 0 && puntaje === 2){
                    this.ganador.sly = '🥉'
                }
                if(this.ronda.sly === 0 && puntaje === 1){
                    this.ganador.sly = '🥈'
                }
                if(this.ronda.huff === 0 && this.ronda.raven === 0 && this.ronda.gryff === 0){
                    this.ganador.sly = '🥇'
                }
                if(this.ronda.huff === 0 && this.ronda.gryff === 0 && this.ronda.raven === 0 && this.ronda.sly === 1){
                    this.ganador.sly = '🥇🥈'
                }
                this.ronda.sly++;  
            }
        },
        aumentarPuntajeRondaHuff(){
            if(this.Validar()===true){
                let puntaje = this.ronda.sly + this.ronda.raven + this.ronda.gryff;
                if(this.ronda.huff === 0 && puntaje === 2){
                    this.ganador.huff = '🥉'
                }
                if(this.ronda.huff === 0 && puntaje === 1){
                    this.ganador.huff = '🥈'
                }
                if(this.ronda.sly === 0 && this.ronda.raven === 0 && this.ronda.gryff === 0){
                    this.ganador.huff = '🥇'
                }
                if(this.ronda.gryff === 0 && this.ronda.sly === 0 && this.ronda.raven === 0 && this.ronda.huff === 1){
                    this.ganador.huff = '🥇🥈'
                }
                this.ronda.huff++;  
            }
        },
        disminuirPuntajeRondaGryff(){
            if(this.Validar()===true){
                if(this.ronda.gryff !== 0){
                    this.ronda.gryff--;
                    if(this.ganador.gryff === '🥇'){
                        if(this.ganador.raven=== '🥈') this.ganador.raven = '🥇';
                        if(this.ganador.sly=== '🥈') this.ganador.sly = '🥇';
                        if(this.ganador.huff=== '🥈') this.ganador.huff = '🥇';
                    }
                    if(this.ganador.gryff === '🥈'){
                        if(this.ganador.raven=== '🥉') this.ganador.raven = '🥈';
                        if(this.ganador.sly=== '🥉') this.ganador.sly = '🥈';
                        if(this.ganador.huff=== '🥉') this.ganador.huff = '🥈';
                    }
                    if(this.ganador.gryff === '🥇🥈'){
                        if(this.ganador.raven=== '🥉') this.ganador.raven = '🥈';
                        if(this.ganador.sly=== '🥉') this.ganador.sly = '🥈';
                        if(this.ganador.huff=== '🥉') this.ganador.huff = '🥈';
                        this.ganador.gryff = '🥇'
                    }
                }
                if(this.ronda.gryff === 0){
                    this.ganador.gryff = ''
                }
            }
        },
        disminuirPuntajeRondaRaven(){
            if(this.Validar()===true){
                if(this.ronda.raven !== 0){
                    this.ronda.raven--;
                    if(this.ganador.raven === '🥇'){
                        if(this.ganador.gryff=== '🥈') this.ganador.ravgryffen = '🥇';
                        if(this.ganador.sly=== '🥈') this.ganador.sly = '🥇';
                        if(this.ganador.huff=== '🥈') this.ganador.huff = '🥇';
                    }
                    if(this.ganador.raven === '🥈'){
                        if(this.ganador.gryff=== '🥉') this.ganador.gryff = '🥈';
                        if(this.ganador.sly=== '🥉') this.ganador.sly = '🥈';
                        if(this.ganador.huff=== '🥉') this.ganador.huff = '🥈';
                    }
                    if(this.ganador.raven === '🥇🥈'){
                        if(this.ganador.gryff=== '🥉') this.ganador.gryff = '🥈';
                        if(this.ganador.sly=== '🥉') this.ganador.sly = '🥈';
                        if(this.ganador.huff=== '🥉') this.ganador.huff = '🥈';
                    }
                }
                if(this.ronda.raven === 0){
                    this.ganador.raven = ''
                }
            }
        },
        disminuirPuntajeRondaSly(){
            if(this.Validar()===true){
                if(this.ronda.sly !== 0){
                    this.ronda.sly--;
                    if(this.ganador.sly === '🥇'){
                        if(this.ganador.gryff=== '🥈') this.ganador.gryff = '🥇';
                        if(this.ganador.raven=== '🥈') this.ganador.raven = '🥇';
                        if(this.ganador.huff=== '🥈') this.ganador.huff = '🥇';
                    }
                    if(this.ganador.sly === '🥈'){
                        if(this.ganador.gryff=== '🥉') this.ganador.gryff = '🥈';
                        if(this.ganador.raven=== '🥉') this.ganador.raven = '🥈';
                        if(this.ganador.huff=== '🥉') this.ganador.huff = '🥈';
                    }
                    if(this.ganador.sly === '🥇🥈'){
                        if(this.ganador.gryff=== '🥉') this.ganador.gryff = '🥈';
                        if(this.ganador.raven=== '🥉') this.ganador.raven = '🥈';
                        if(this.ganador.huff=== '🥉') this.ganador.huff = '🥈';
                    }
                } 
                if(this.ronda.sly === 0){
                    this.ganador.sly = ''
                }
            }
        },
        disminuirPuntajeRondaHuff(){
            if(this.Validar()===true){
                if(this.ronda.huff !== 0){
                    this.ronda.huff--;
                    if(this.ganador.huff === '🥇'){
                        if(this.ganador.gryff=== '🥈') this.ganador.gryff = '🥇';
                        if(this.ganador.raven=== '🥈') this.ganador.raven = '🥇';
                        if(this.ganador.sly=== '🥈') this.ganador.sly = '🥇';
                    }
                    if(this.ganador.huff === '🥈'){
                        if(this.ganador.gryff=== '🥉') this.ganador.gryff = '🥈';
                        if(this.ganador.raven=== '🥉') this.ganador.raven = '🥈';
                        if(this.ganador.sly=== '🥉') this.ganador.sly = '🥈';
                    }
                    if(this.ganador.huff === '🥇🥈'){
                        if(this.ganador.gryff=== '🥉') this.ganador.gryff = '🥈';
                        if(this.ganador.raven=== '🥉') this.ganador.raven = '🥈';
                        if(this.ganador.sly=== '🥉') this.ganador.sly = '🥈';
                    }
                } 
                if(this.ronda.huff === 0){
                    this.ganador.huff = ''
                }
            }
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#logo {
  height: 120px;
}
</style>


