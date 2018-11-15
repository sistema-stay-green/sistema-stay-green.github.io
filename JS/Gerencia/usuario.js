/**
 * Classe para manipular os dados do usuário
 * @author Rubens
*/

 class Usuario {

    constructor(id){

        this.id(id);
        this.nome(null);
        this.cnpj(null);
        this.saldo(null);
        this.email(null);
        this.senha(null);

    }

    /**
      * Tenta converter uma string para o seu valor em Float e a retorna.
      * @param {string} number String a ser convertida.
      * @param {boolean} typeFloat Indica se a String deve ser convertida para
      * formato float ou não (padrão false)
      * @returns {number} Valor em Float/Int correspondente ou o valor inicial.
      * @author Mei, Pedro
    */
    tryParse(number, typeFloat = false) {

        if (!isNaN(number) && number != undefined)
            return typeFloat ? parseFloat(number) : parseInt(number);
        else
            return number;

    }

    /**
     * Converte objeto Maquina em string JSON.
     * @returns {string} String com formatação JSON do objeto.
     * @author Guilherme Sena
     */
    toJSON(){

        let usuarioJSON = { };

        if (this.id() !== null)
            usuarioJSON["idUsuario"] = this.id();

        if (this.nome() !== null)
            usuarioJSON["nomeUsuario"] = this.nome();
        
        if (this.cnpj() !== null)
            usuarioJSON["cpnjUsuario"] = this.cnpj();

        if (this.saldo() !== null)
            usuarioJSON["saldoUsuario"] = this.saldo();

        if (this.email() !== null)
            usuarioJSON["emailUsuario"] = this.email();

        if (this.senha() !== null)
            usuarioJSON["senhaUsuario"] = this.senha();

        return JSON.stringify(usuarioJSON);

    }

    //Getter

    get id(){
        return this._idUsuario;
    }

    get nome(){
        return this._nomeUsuario;
    }

    get cnpj(){
        return this._cnpjUsuario;
    }

    get saldo(){
        return this._saldoUsuario
    }

    get email(){
        return this._emailUsuario;
    }

    get senha(){
        return this._senhaUsuario;
    }

    //Setter

    set id(id){
        this._idUsuario = this.tryParse(id);
    }

    set nome(nome){
        this._nomeUsuario = nome;
    }

    set cnpj(cnpj){
        this._cnpjUsuario = this.tryParse(cnpj);
    }

    set saldo(saldo){
        this._saldoUsuario = this.tryParse(saldo, true);
    }

    set email(email){
        this._emailUsuario = email;
    }

    set senha(senha){
        this._senhaUsuario = senha;
    }

 }