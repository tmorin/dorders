#!/usr/bin/env bash

cnfDir=${GDIAG_AD=".gdiag"}
wrkDir=${GDIAG_WD=""}
doClean=""

POSITIONAL=()
while [[ $# -gt 0 ]]; do
  key="$1"
  case ${key} in
    -cd=*|--cnf-dir=*)
    cnfDir="${key#*=}"
    ;;
    -wd=*|--wrk-dir=*)
    wrkDir="${key#*=}"
    ;;
    -c|--clean)
    doClean="yes"
    ;;
    *)
    POSITIONAL+=("$1")
    ;;
  esac
  shift
done
set -- "${POSITIONAL[@]}"

downloadPlantUML() {
  local url=http://sourceforge.net/projects/plantuml/files/plantuml.jar/download
  local jar=${cnfDir}/plantuml.jar
  mkdir -p ${cnfDir}
  if [[ ! -f "${jar}" ]]; then
    wget ${url} -O ${jar}
  fi
}

downloadLibs() {
  local url=https://github.com/tmorin/plantuml-libs/archive/master.zip
  local zip=${cnfDir}/libs.zip
  mkdir -p ${cnfDir}
  if [[ ! -f "${zip}" ]]; then
    wget ${url} -O ${zip}
    unzip -d ${cnfDir} ${zip}
  fi
}

downloadPlantUML
downloadLibs

#export SDKMAN_DIR="/home/tmorin/.sdkman"
#[[ -s "/home/tmorin/.sdkman/bin/sdkman-init.sh" ]] && source "/home/tmorin/.sdkman/bin/sdkman-init.sh"
#sdk use java 12.0.2.j9-adpt

if [[ ${doClean} == "yes" ]]; then
  find ${wrkDir} -type f -name "*.png" -exec rm {} \;
  rm -f ${cnfDir}/latest_run
fi

if [[ -f ${cnfDir}/latest_run ]]; then
   find ${wrkDir} -type f \
    -name "*.puml" \
    -not -path ".*" \
    -newer ${cnfDir}/latest_run \
    -exec java -jar ${cnfDir}/plantuml.jar $@ {} \;
else
  find ${wrkDir} -type f \
    -name "*.puml" \
    -not -path ".*" \
    -exec java -jar ${cnfDir}/plantuml.jar $@ {} \;
fi

touch ${cnfDir}/latest_run
