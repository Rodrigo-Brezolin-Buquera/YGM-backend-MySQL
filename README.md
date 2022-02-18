# Controle de planos e aulas

O espaço Yoga Mangala é um studio de Yoga. A Aplicação permite aos alunos fazer checkin nos horários de aula disponíveis, além de controlar quantidade de aulas restantes e faltas. Para os administradores, é possível, visualizar e editar os planos de todos os alunos, editar horários disponíveis e criar novos usuários


O backend possui 4 entidades e 4 tipos de usuários:

**Estudante:** Acesso a rotas específicas relacionadas a si mesmo, aulas e check-in.

**Professor:** Acesso a visualizar tudo, mas edição de apenas de algumas rotas de aulas e todas de check-in.

**Visitante:** Acesso a visualizar tudo, mas não modifica nada (tem um motivo, confia)

**Aduministrador:** Acesso total, com excessão as rotas exlusivas de estudantes. Único capaz de criar usuários, aulas e planos.

**Acessos:**

            **Admin**
            email: "admin@email.com",
            password: 123456a
       
            **Teacher**          
            email: "teacher@email.com",
            password: 123456t
      
            **Visitor**
            email: "visitor@email.com",
            password: 123456v
      
            **Student**
            email: "student@email.com",
            password: 123456s
          


**Entidades:**


![Diagrama em branco](https://user-images.githubusercontent.com/81428197/134186600-3783984f-03e8-4e77-a43f-cc039755acbb.png)

**Documentação:**  https://documenter.getpostman.com/view/15825760/UUxxfTM5 
