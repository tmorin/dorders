#!/usr/bin/env bash

docker run --rm \
  -v "$(pwd)":/documents \
  -w /documents \
  -u 1000:1000 \
  asciidoctor/docker-asciidoctor \
  asciidoctor-pdf paper/README.adoc -D dist -o dorders-paper.pdf -a pdf-theme=paper/pdf-style/basic-theme.yml

docker run --rm \
  -v "$(pwd)":/documents \
  -w /documents \
  -u 1000:1000 \
  asciidoctor/docker-asciidoctor \
  asciidoctor paper/README.adoc -D dist/paper -a toc=left -o index.html 
cp -f paper/*.png dist/paper
cp -f paper/*.svg dist/paper
