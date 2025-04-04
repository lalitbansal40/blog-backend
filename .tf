pre_build:
  commands:
    - cd terraform
    - terraform init

build:
  commands:
    - cd terraform
    - terraform plan -input=false
