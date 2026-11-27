
// ======================================================
// PROJETO AV2 - BANCO DE DADOS NoSQL
// Sistema: StreamPlay - Plataforma de Streaming
// Aluno: Eloa Morente e Marcos Paulo
// Turma: 2A - Tecnico em Informatica
// Professor: Brian Samuel
// ======================================================


// BANCO DE DADOS
use("StreamPlayDB");

db.Usuarios.deleteMany({ projeto: "StreamPlay" });
db.Midias.deleteMany({ projeto: "StreamPlay" });
db.Avaliacoes.deleteMany({ projeto: "StreamPlay" });




db.Usuarios.insertOne({
    projeto: "StreamPlay",
    nome: "EloaMorente",
    email: "eloa@email.com",
    idade: 17,
    status: "ativo",

    perfil: {
        tipo: "Premium",
        idioma: "Portugues",
        qualidade: "4K"
    },

    favoritos: [
        { midiaId: 101, titulo: "Alem das Estrelas" },
        { midiaId: 102, titulo: "Mundo Perdido" }
    ],

    historico: [
        { midiaId: 101, data: "2026-11-20", progresso: 100 },
        { midiaId: 103, data: "2026-11-21", progresso: 60 }
    ]
});


db.Usuarios.insertMany([
    {
        projeto: "StreamPlay",
        nome: "Marcos Paulo",
        email: "marcos@email.com",
        idade: 16,
        status: "ativo",
        perfil: {
            tipo: "Gratuito",
            idioma: "Portugues"
        },
        favoritos: [
            { midiaId: 104, titulo: "Horizonte" }
        ],
        historico: []
    },
    {
        projeto: "StreamPlay",
        nome: "Ana Paula",
        email: "ana@email.com",
        idade: 42,
        status: "ativo",
        perfil: {
            tipo: "Premium",
            idioma: "Ingles",
            qualidade: "Full HD"
        },
        favoritos: [],
        historico: [
            { midiaId: 102, data: "2026-11-22", progresso: 100 }
        ]
    }
]);


db.Midias.insertMany([
    {
        projeto: "StreamPlay",
        titulo: "Alem das Estrelas",
        tipo: "Filme",
        categoria: "Ficcao cientifica",
        anoLancamento: 2023,
        duracaoMin: 120,
        notaMedia: 9.2,
        status: "ativo"
    },
    {
        projeto: "StreamPlay",
        titulo: "Mundo Perdido",
        tipo: "Serie",
        categoria: "Aventura",
        anoLancamento: 2022,
        temporadas: 3,
        episodios: 24,
        notaMedia: 8.7,
        status: "ativo"
    },
    {
        projeto: "StreamPlay",
        titulo: "Horizonte",
        tipo: "Musica",
        categoria: "Pop",
        anoLancamento: 2024,
        artista: "Lucas Martins",
        duracaoSegundos: 210,
        notaMedia: 9.5,
        status: "ativo"
    },
    {
        projeto: "StreamPlay",
        titulo: "Codigo do Futuro",
        tipo: "Documentario",
        categoria: "Tecnologia",
        anoLancamento: 2021,
        duracaoMin: 90,
        notaMedia: 8.9,
        status: "ativo"
    },
    {
        projeto: "StreamPlay",
        titulo: "A ultima Jornada",
        tipo: "Filme",
        categoria: "Acao",
        anoLancamento: 2020,
        duracaoMin: 110,
        notaMedia: 7.8,
        status: "inativo"
    }
]);


db.Avaliacoes.insertMany([
    {
        projeto: "StreamPlay",
        usuario: "Eloa Morente",
        midia: "Alem das Estrelas",
        nota: 10,
        comentario: "Excelente filme!",
        status: "aprovada"
    },
    {
        projeto: "StreamPlay",
        usuario: "Marcos Paulo",
        midia: "Mundo Perdido",
        nota: 9,
        comentario: "Muito interessante.",
        status: "aprovada"
    },
    {
        projeto: "StreamPlay",
        usuario: "Ana Paula",
        midia: "Horizonte",
        nota: 10,
        comentario: "Adorei a musica!",
        status: "aprovada"
    },
    {
        projeto: "StreamPlay",
        usuario: "Eloa Morente",
        midia: "A ultima Jornada",
        nota: 2,
        comentario: "Comentario inadequado.",
        status: "inadequada"
    }
]);



db.Midias.find({
    anoLancamento: { $gt: 2021 }
});


db.Midias.find({
    categoria: {
        $in: ["Aventura", "Pop", "Acao"]
    }
});


db.Midias.find(
    { status: "ativo" },
    {
        _id: 0,
        titulo: 1,
        tipo: 1,
        categoria: 1
    }
);



db.Usuarios.updateOne(
    { email: "ana@email.com" },
    {
        $set: {
            "perfil.tipo": "Premium Plus"
        }
    }
);



db.Midias.updateMany(
    {
        categoria: {
            $in: ["Acao", "Ficcao cientifica"]
        }
    },
    {
        $set: {
            destaque: true
        }
    }
);


db.Usuarios.updateOne(
    { email: "ana@email.com" },
    {
        $push: {
            favoritos: {
                midiaId: 104,
                titulo: "Horizonte"
            }
        }
    }
);


db.Avaliacoes.deleteOne({
    usuario: "Eloa Morente",
    status: "inadequada"
});


db.Midias.aggregate([
    {
        $match: {
            status: "ativo"
        }
    },
    {
        $group: {
            _id: "$categoria",
            quantidade: { $sum: 1 },
            mediaNotas: { $avg: "$notaMedia" }
        }
    },
    {
        $sort: {
            mediaNotas: -1
        }
    }
]);


db.Midias.aggregate([
    {
        $match: {
            status: "ativo"
        }
    },
    {
        $group: {
            _id: "$tipo",
            totalMidias: { $sum: 1 },
            mediaAvaliacoes: { $avg: "$notaMedia" }
        }
    },
    {
        $project: {
            _id: 0,
            tipoDeMidia: "$_id",
            quantidadeDeMidias: "$totalMidias",
            mediaDasAvaliacoes: "$mediaAvaliacoes"
        }
    },
    {
        $sort: {
            quantidadeDeMidias: -1
        }
    }
]);
