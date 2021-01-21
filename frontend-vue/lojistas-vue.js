(() => {

    var vm = new Vue({
        el: document.querySelector('#app'),
        data() {
            return {
                lojistas: [],
                _id: '',
                nome: '',
                descricao: '',
                imgLogo: '',
                status: '',
                successMessage: false,
                successDelete: false,
            }
        },
        mounted() {
            this.getLojistas()
        },
        computed: {
            list() {
                let lojistas = this.lojistas
                if (this.nome) {
                    lojistas = lojistas.filter((p) => {
                        return p.nome.indexOf(this.nome) !== -1
                    })
                }

                return lojistas
            }

        },
        template: `<div>
                      <div style="position: fixed; top: 50px; right: 30px;">
                        <div
                          class="alert alert-success"
                          v-if="successMessage"
                          transition="expand"
                        >Lojista gravado com sucesso!</div>
                        <div
                          class="alert alert-success"
                          v-if="successDelete"
                          transition="expand"
                        >Lojista excluído com sucesso!</div>
                      </div>
                      <div class="row">
                      <form v-on:submit.prevent="postLojista">
                        <div class="card mb-auto">
                            <div aria-controls="lojistaForm" aria-expanded="false" class="card-header" data-target="#lojistaForm"
                                data-toggle="collapse" id="formHeader" style="cursor: pointer">
                                <div class="float-left btn btn-primary">Novo / Editar lojista</div>
                                <br/><br/>
                            </div>
                            <div class="card card-body collapse" id="lojistaForm">
                                <div>
                                    <input id="lojistaId" type="hidden" v-model="_id">
                                    <input id="lojistaNome" class="form-control col-sm-8" placeholder="Nome do lojista" type="text"
                                              v-model="nome"/>
                                    <br/><br/>
                                    <input id="lojistaDescricao" class="form-control col-sm-8" placeholder="Descrição" type="text"
                                    v-model="descricao"/>
                                    <br/><br/>
                                    <input id="lojistaDescricao" class="form-control col-sm-8" placeholder="status" type="text"
                                    v-model="status"/>
                                    <br/><br/>
                                    
                                </div>
                                <div class="form-group float-right">
                                    <input class="btn btn-primary" type="submit" value="Salvar">
                                </div>
                            </div>
                        </div>
                      </form>
                    </div>
                    <div class="row">
                      <h3>Lojistas cadastrados</h3>
                      <div class="form-group">                   
                        <input id="pesquisa" type='text' v-model="nome" placeholder='Pesquisar lojista...'/><br>                                             
                      </div>
                      <br/>

                      <table class="table table-striped" style="border: none;">
                        <thead class="table table-striped">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Link</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Logo</th>
                                <th scope="col">Status</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody class="table table-striped" id="tableShow">
                            <tr v-for="lojista in list">
                                <th scope="row" style="font-size: 10px; width: 25%">{{lojista._id}}</th>
                                <td>{{lojista.nome}}</td>
                                <td style="width: 10%"><a v-bind:href="'http://localhost:3000/api/lojista/'+lojista._id">link</a></td>
                                <td>{{lojista.descricao}}</td>
                                <td><img v-bind:src="'data:image/jpeg;base64,'" /></td>
                                <td>{{lojista.status}}</td>
                                <td>
                                  <button aria-controls="lojistaForm" class="btn btn-primary" v-on:click="editLojista(lojista)" data-target="#lojistaForm" data-toggle="collapse">
                                    Edit
                                  </button> 
                                  <button class="btn btn-danger" v-on:click="deleteLojista(lojista)">
                                    Delete
                                  </button>
                                </td>
                            </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>`,

        methods: {
            getLojistas: function() {
                axios
                    .get("http://localhost:3000/api/lojista")
                    .then(response => (this.lojistas = response.data))
                    .then(data => Vue.set(this, 'lojistas', data))
            },
            postLojista: async function(event) {
                if (this._id == '' || this._id == null) {
                    await axios
                        .post("http://localhost:3000/api/lojista", {
                            "nome": this.nome,
                            "descricao": this.descricao,
                            "status": this.status
                        })
                        .then(savedLojista => {
                            this.lojistas.push(savedLojista.data);
                            this.getLojistas();
                            this.nome = '';
                            this.descricao = '';
                            this.status = '';
                            this._id = '';
                            this.exibirMessagemSucesso();
                            document.getElementById('lojistaForm').setAttribute("class", document.getElementById('lojistaForm').getAttribute("class") + "hide");
                        })
                } else {
                    axios
                        .put("http://localhost:3000/api/lojista/" + this._id, {
                            "nome": this.nome,
                            "descricao": this.descricao,
                            "status": this.status
                        })
                        .then(savedLojista => {
                            this.getLojistas();
                            this.nome = '';
                            this.descricao = '';
                            this.status = '';
                            this._id = '';
                            this.exibirMessagemSucesso();
                            document.getElementById('lojistaForm').setAttribute("class", document.getElementById('lojistaForm').getAttribute("class") + "hide");
                        })
                }
            },
            editLojista: function(lojista) {
                this._id = lojista._id;
                this.nome = lojista.nome;
                this.descricao = lojista.descricao;
                this.status = lojista.status;
            },
            deleteLojista: async function(lojista) {
                await axios
                    .delete("http://localhost:3000/api/lojista/" + lojista._id);
                this.getLojistas()
                this.exibirMessagemExcluir()
            },
            exibirMessagemSucesso: function() {
                this.successMessage = true;
                setTimeout(
                    function() {
                        this.successMessage = false;
                    }.bind(this),
                    5000
                );
            },
            exibirMessagemExcluir: function() {
                this.successDelete = true;
                setTimeout(
                    function() {
                        this.successDelete = false;
                    }.bind(this),
                    5000
                );
            }
        },

    })

})();