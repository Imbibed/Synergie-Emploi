package fr.audithor.dto.exceptions

class FileEmptyException(val filename: String) : Exception("Le fichier $filename est vide")
