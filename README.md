Groupe :
```
Pierrick Bauffe
Thibault Balleux
Louis Hanqiuez
Quentin machado
```
Qu’est ce que DEVOPS ?

DevOps est une philosophie de travail qui encourage une collaboration plus étroite entre les équipes de développement (Dev) et d'exploitation (Ops), d'où son nom. L'objectif de DevOps est de raccourcir le cycle de vie du développement de logiciels et de fournir une livraison continue de logiciels de haute qualité.

Pourquoi DEVOPS ?

Traditionnellement, les équipes de développement et d'exploitation travaillaient en silos. Les développeurs écrivaient le code et le passaient à l'équipe des opérations pour le déploiement. Cela a souvent conduit à des problèmes de communication et de coordination, entraînant des retards de déploiement, des erreurs et des bugs.

DevOps vise à résoudre ces problèmes en promouvant une culture de collaboration et de partage entre les équipes. En adoptant des pratiques DevOps, les équipes peuvent :

Améliorer la vitesse de livraison : Grâce à l'automatisation et à l'intégration continue, les équipes peuvent livrer des fonctionnalités plus rapidement et avec moins d'erreurs.
Augmenter la qualité du produit : En intégrant les tests dans le processus de développement, les bugs sont découverts et corrigés plus tôt.
Améliorer la satisfaction de l'équipe : L'adoption d'une culture de collaboration améliore la communication et réduit les frustrations liées au travail en silos.
Réduire les coûts : L'automatisation des processus de déploiement et de tests réduit le temps et les ressources nécessaires pour livrer de nouvelles fonctionnalités.

La philosophie DevOPS 

DevOps n'est pas juste un ensemble d'outils ou de pratiques, c'est une philosophie qui nécessite un changement de mentalité. L'adoption de DevOps implique :
Culture de collaboration : Les équipes de développement et d'exploitation doivent travailler ensemble et partager la responsabilité du produit.
Automatisation : Les processus de développement, de test et de déploiement doivent être automatisés autant que possible pour réduire les erreurs et accélérer la livraison.
Intégration continue : Le code doit être intégré et testé continuellement pour détecter les problèmes le plus tôt possible.
Livraison continue : Le logiciel doit être en état de livraison à tout moment.
Feedback continu : Les équipes doivent utiliser les retours d'information pour améliorer le produit et le processus de développement.
Dans les sections suivantes, nous allons explorer en détail comment mettre en œuvre une culture DevOps, les outils que nous recommandons, les pratiques spécifiques à adopter, et comment nous avons appliqué les principes DevOps à un projet client spécifique.

La culture DEVOPS 

La culture DevOps représente un changement radical dans la manière dont les équipes de développement et d'exploitation collaborent. Elle se concentre sur la suppression des silos traditionnels et encourage la communication, la collaboration et l'intégration entre ces équipes. Voici les éléments clés de la culture DevOps :

Collaboration :
Dans une culture DevOps, les équipes de développement et d'exploitation travaillent ensemble tout au long du cycle de vie du développement logiciel. Elles partagent la responsabilité de la livraison du logiciel, de sa qualité et de sa maintenance. Cela signifie que les développeurs doivent comprendre les implications de leurs choix de conception sur l'environnement de production, tandis que les opérations doivent être impliquées dès le début du processus de développement.

Communication :
Une communication ouverte et fréquente est essentielle dans une culture DevOps. Les équipes doivent partager leurs connaissances, leurs idées et leurs problèmes. Cela peut se faire par le biais de réunions régulières, de la documentation, de l'utilisation d'outils de collaboration, etc. L'objectif est de s'assurer que tout le monde est sur la même longueur d'onde et comprend les objectifs communs.

Intégration :
L'intégration est un autre aspect clé de la culture DevOps. Elle concerne non seulement l'intégration du code (comme dans l'intégration continue), mais aussi l'intégration des équipes et des processus. Les équipes de développement et d'exploitation doivent travailler ensemble et intégrer leurs processus pour atteindre une livraison continue et une qualité supérieure du logiciel.

Automatisation :
Dans une culture DevOps, l'automatisation est essentielle. Le but est de minimiser les tâches manuelles répétitives qui peuvent conduire à des erreurs et ralentir le processus de livraison. Cela concerne tous les aspects du cycle de vie du développement logiciel, de l'intégration continue à la livraison continue, en passant par le déploiement, le test et la surveillance.

Apprentissage et amélioration continus :
Une culture DevOps encourage l'apprentissage et l'amélioration continus. Les équipes doivent constamment évaluer leurs processus et leurs outils, apprendre de leurs erreurs et chercher à s'améliorer. Cela implique également une volonté d'expérimenter de nouvelles idées et d'adopter de nouvelles technologies.
En adoptant une culture DevOps, votre organisation peut améliorer la collaboration entre les équipes, accélérer la livraison de logiciels, augmenter la qualité du produit et améliorer la satisfaction de l'équipe. Dans la section suivante, nous examinerons certains des outils DevOps que vous pouvez utiliser pour faciliter cette transition.



Outils DevOps
Pour mettre en œuvre la culture DevOps, l'utilisation d'outils appropriés est essentielle. Ces outils favorisent l'automatisation, l'intégration continue, le déploiement continu et le monitoring, qui sont tous des aspects clés de la philosophie DevOps. Voici quelques-uns des outils DevOps les plus populaires que nous recommandons :
Git
Git est un système de contrôle de version distribué qui permet aux développeurs de suivre et de gérer les modifications du code source au fil du temps. Il facilite la collaboration entre les développeurs et est essentiel pour l'intégration continue.
Jenkins
Jenkins est un outil d'intégration continue/de livraison continue (CI/CD) open source qui permet d'automatiser différentes phases du cycle de vie du développement logiciel. Avec Jenkins, vous pouvez compiler le code, exécuter des tests, détecter les bugs et déployer le code en production automatiquement, ce qui accélère considérablement le processus de livraison.
Docker
Docker est une plateforme open source qui facilite la création, le déploiement et l'exécution d'applications en utilisant la technologie des conteneurs. Les conteneurs permettent aux développeurs de regrouper une application avec toutes ses dépendances et de la déployer comme un package unique, assurant ainsi la cohérence entre les environnements de développement et de production.
Kubernetes
Kubernetes est un système open source pour l'automatisation du déploiement, de la mise à l'échelle et de la gestion des applications conteneurisées. Il fonctionne parfaitement avec Docker et est particulièrement utile pour gérer des déploiements complexes à grande échelle.
Ansible
Ansible est un outil de gestion de configuration open source qui permet d'automatiser l'installation et la configuration de logiciels sur des serveurs. Avec Ansible, vous pouvez garantir que tous vos environnements sont configurés de manière cohérente et correcte.
Prometheus et Grafana
Prometheus est un système de monitoring et d'alerte open source qui peut recueillir des métriques à partir de diverses sources. Grafana est une plateforme de visualisation de données qui peut être utilisée pour créer des tableaux de bord à partir des données collectées par Prometheus. Ensemble, ils permettent de surveiller en temps réel l'état de vos applications et de votre infrastructure.
Ces outils ne sont que quelques exemples des nombreuses options disponibles pour soutenir une culture DevOps. Le choix des outils dépendra de vos besoins spécifiques et de votre environnement technologique actuel. Dans la section suivante, nous discuterons de certaines pratiques DevOps que vous pouvez adopter en utilisant ces outils.


Le déploiement d'une culture et d'un processus DevOps dans une organisation peut se faire de plusieurs manières, selon les spécificités et les besoins de l'organisation. Cependant, une approche communément acceptée pour mettre en place DevOps implique généralement les huit étapes suivantes :
Évaluation de l'état actuel : Cette étape comprend l'évaluation de l'infrastructure informatique actuelle, des processus de travail, des outils, et du niveau de collaboration entre les équipes de développement et d'opérations. Identifiez les points d'amélioration et les goulots d'étranglement dans les processus existants.
Définition des objectifs : Établissez ce que vous souhaitez réaliser avec la mise en place de DevOps. Les objectifs peuvent inclure l'amélioration de la qualité du logiciel, la réduction du temps de mise sur le marché, l'augmentation de la fréquence de déploiement, etc.
Planification : À ce stade, vous créez un plan d'action qui définit comment vous allez atteindre vos objectifs. Ce plan peut inclure le choix des outils à utiliser, la définition des rôles et responsabilités, la planification des formations nécessaires, etc.
Formation et développement des compétences : La mise en place de DevOps nécessite souvent de nouvelles compétences. Il peut s'agir de la formation des équipes existantes ou de l'embauche de nouveaux talents.
Création d'une culture DevOps : Cette étape implique de promouvoir une culture de collaboration, de partage et d'amélioration continue. L'objectif est d'éliminer les silos et d'encourager les équipes de développement et d'opérations à travailler ensemble.
Mise en place d'une intégration continue et d'une livraison continue (CI/CD) : C'est l'implémentation technique de DevOps. Cela implique l'automatisation des processus de build, de test et de déploiement pour permettre des mises à jour fréquentes et fiables du logiciel.
Mise en œuvre de la surveillance et des commentaires (feedback) : Les outils de surveillance permettent de détecter et de résoudre les problèmes rapidement. De plus, l'obtention de commentaires des utilisateurs et des membres de l'équipe est essentielle pour l'amélioration continue.
Amélioration continue : Enfin, DevOps est un processus continu. Utilisez les métriques et les commentaires pour identifier les domaines d'amélioration et ajuster vos processus en conséquence.

Ce qui a été mis en place

 Flux CI/CD pour le projet Arosaje. Ce flux nous permet d'assurer la qualité de notre code et de faciliter son déploiement.

Nous utilisons Ubuntu 20.04 comme système d'exploitation, Node.js 14 pour notre application frontend, et Python 3.8 pour notre application backend.

Nous vérifions le code en cours à l'aide de l'action "checkout" pour récupérer les dernières modifications.
Ensuite, nous configurons Node.js et installons les dépendances nécessaires à notre application frontend. Nous construisons ensuite l'application React à l'aide de la commande "npm run build".
Pour notre application backend en Python, nous configurons Python et installons ses dépendances à l'aide de pip. Nous exécutons ensuite les tests unitaires pour nous assurer que notre code fonctionne correctement.


Ensuite, nous ajoutons une étape supplémentaire à notre flux : l'utilisation de Docker. Nous construisons une image Docker en utilisant notre fichier Dockerfile-API. Cela nous permet de créer un environnement isolé pour exécuter notre application de manière cohérente.


Voici un exemple de configuration YAML représentant notre flux CI/CD. Nous définissons les différentes étapes et actions à effectuer pour chaque étape. Cela inclut la configuration de Node.js et de Python, l'installation des dépendances, l'exécution des tests unitaires, la création et l'activation d'un environnement virtuel Python, et bien plus encore.

En conclusion, notre flux CI/CD nous permet d'assurer la qualité de notre code en automatisant les tests unitaires et en générant des rapports de couverture de code. Nous construisons également une image Docker pour faciliter le déploiement de notre application. Cela nous permet d'améliorer l'efficacité et la cohérence de notre processus de développement.


