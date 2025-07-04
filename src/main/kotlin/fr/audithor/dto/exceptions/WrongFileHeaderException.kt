package fr.audithor.dto.exceptions

class WrongFileHeaderException(val header: String, val attempted: String) : Exception("L'entête du fichier devrait être $attempted et es $header") {
}
