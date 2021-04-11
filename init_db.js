var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('sigo.db');

db.serialize(function() {
    db.run("CREATE TABLE companies (code TEXT, description TEXT, speciality TEXT)");
    db.run("CREATE TABLE users (username TEXT, password TEXT)");

    var stmt = db.prepare("INSERT INTO companies VALUES (?, ?, ?)");

    stmt.run(["COA", "Conta +", "Contabilidade"]);
    stmt.run(["C&P", "Consultorias de Processos Industriais", "Processos Industriais"]);
    stmt.run(["A+", "A PLUS", "Comercial"]);
    stmt.run(["INDA", "Consultoria em Vendas", "Comercial"]);
    stmt.run(["RH", "Recursos Humanos", "RH"]);
    stmt.run(["Fuzzion", "Fuzzion: Processos logísticos", "Logística"]);
    stmt.run(["JUBA", "Jeito Único para Logística", "Logística"]);
    stmt.run(["R+", "R MAIS Contratações", "RH"]);
    stmt.run(["Treinamento SA", "Treinando Vendas", "Vendas"]);
    stmt.run(["VENDACON", "Consultorias em Vendas", "Vendas"]);
    stmt.run(["TeachingQuality", "Capacitação em Processos de Qualidade", "Treinamento"]);
    stmt.run(["SecTextil", "Segurança no setor Têxtil", "Segurança"]);
    stmt.run(["VAI", "Especialidade do setor têxtil", "Têxtil"]);
    stmt.run(["LETT", "Levando prosperidade ao setor têxtil", "Têxtil"]);
    stmt.run(["SOTT", "Desenvolvimento de Processos Têxtil", "Têxtil"]);

    stmt.finalize();
 
    stmt = db.prepare("INSERT INTO users VALUES (?, ?)");
    stmt.run(["nata", "nata123"]);
    stmt.finalize();
    
  });
  
  db.close();


