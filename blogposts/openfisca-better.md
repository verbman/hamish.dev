---
layout: post
title:  OpenFisca Better
author: Hamish
date: "2022-11-13"
categories: [ Rules as code, Open interpretation, Open Fisca ]
image: /assets/images/openfisca-structure.png
imagealt: "OpenFisca Aotearoa structure.json file"
excerpt: Back in 2018 I was tasked with setting up how the new Openfisca Aotearoa project was going to work.
featured: true
---

OpenFisca is an exquisitely unique open source platform developed in France to provide tax and benefit simulations.
It’s been picked up around the world by parties interested in coding rules for the various reasons you do this and is uniquely powerful in it’s areas of strengths. It does however face the same challenges that similiar products in this space face.

#### Problem 1:
A lot of time and effort goes into the actual interpreting of law into code and once it’s coded, the resulting code is not very portable. 

#### Problem 2:
Tracking concepts interpreted in the law can get very messy. It’s entirely too easy to recreate an existing variable and call it something new. It can also lead to naming conflicts between Act’s (i.e. the million definitions of a child in the NZ law landscape).

#### Problem 3
Code doesn’t offer much to non programmers who might want to study the identified concepts and their relationships to each other. Or service designers trying to design an application that will make use of the code base.

#### Problem 4
Naming things. This is always a problem in computer science. It’s especially difficult when you’re wanting to interpret law.

## So.

Back in 2018 I was tasked with setting up how the new Openfisca Aotearoa project was going to work. I spent a lot of time staring at my computer screen wondering about naming and not doing very much coding. Ironically one of the issues I faced which the French did not is that I couldn't use many of the ideal English terms because they were Python keywords (take _“property”_ for example - the French just get to stick with their _"propriété"_). 


So after a series of false starts we came up with a pattern which is complimentary to how OpenFisca works.
It all boils down to a simple “Tuple like” approach and a single [structure.json](https://github.com/digitalaotearoa/openfisca-aotearoa/blob/main/openfisca_aotearoa/structure.json) file. I outline our approach here: [CONTRIBUTING.md](https://github.com/digitalaotearoa/openfisca-aotearoa/blob/main/CONTRIBUTING.md#structure). 

_Python namespacing wasn't a viable option but I can no longer remember why so if you're starting from scratch please take a look and let me know!_


It's this approach that enables us to generate things like this from our source code:

<iframe src="https://embed.kumu.io/932ae946dd5d5bff6ea48f452380053b" width="940" height="600" frameborder="0"></iframe>

<small>_Note: each of those nodes are clickable, when you click on the smallest ones you get links to BOTH the legislation AND code that inspired it You can see it [full screen](https://kumu.io/hamishfraser/openfisca-aotearoa)._</small>

---
### Some Explaning

Here's a variable in our project; `jobseeker_support__entitled`
It's two parts seperated by a double underscore. The first part indicates where the variable comes from and the second part is the variable itself.
If we look at the structure.json file linked to above we find a flat list of objects, each with properties: `Title`, `Prefix`, `Type`, `Reference` and sometimes `Children. `
One of those objects has a `Prefix` of value `jobseeker_support`. It also states it's of `Type` `Section`.
So if we look elsewhere in that file we find it mentioned again as a child the object representing the main Act that section comes from. This allows us to create as many layers of items as we care for.

## Why do this?

#### Reason one
It allows us to do some cool stuff like export all our variable names along with how they relate to each other. If we wanted to recode this work in another environment, we can at least get a good sense of the structure and variables. 

#### Reason two:
It forces someone creating a variable to be really specific about what they're defining. If they're coding something in the *“Social Security Act 2018”* and it references the *“Veterans' Support Act 2014”* they have to consider where the definition for the concept at hand actually lives. This helps align the code to the structure of the law which in turns also helps new programmers at a later date.

#### Reason three:
We can output dynamic maps like the above which non programmers can reference to see the scope of what has been coded. It also allows them to identify variable names and concepts for designing services that will utilise the code base.

#### Reason four:
The second part of the variable name can be far more precisely labelled as it's no longer competing for uniqueness against the whole of the code base.

We keep the `structure.json` file updated manually. The relationships it captures do not exist within the code base. It also provides a handy directory of all the legal instruments that have informed the project.

I hope that's helpful for any new OpenFisca projects starting out, unfortunately it's major breaking changes to the API end points for any existing projects that might want to adapt. 

_I'll be posting another piece covering some other styles we've adopted that I think is worth sharing_

---

#### Links:

<small>

- [Kumu Project](https://kumu.io/hamishfraser/openfisca-aotearoa)

API Endpoints:
 - [Custom Endpoint for Kumu](https://hamish.dev/api/openfisca)
 - [OpenFisca Aotearoa Variables](https://rac.g0v.nz/variables)
 - [structure.json](https://github.com/digitalaotearoa/openfisca-aotearoa/blob/main/openfisca_aotearoa/structure.json)

</small>