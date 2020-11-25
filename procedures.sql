CREATE PROCEDURE GetCasosAcomulados()
BEGIN
	SET @running_total = 0;
    SET @running_total_masculino = 0;
    SET @running_total_femenino = 0;
    SELECT 
		t.fecha,
        t.dTotal,
        t.dMasculino,
        t.dFemenino,
		(@running_total := @running_total + dTotal) as acomulados,
        (@running_total_masculino := @running_total_masculino + dMasculino) as acomuladosMasculino,
        (@running_total_femenino := @running_total_femenino + dFemenino) as acomuladosFemenino
	FROM 
    (	SELECT a.fechaCreacion as fecha,
			COUNT(a.idEncuesta) as dTotal,
			SUM(CASE WHEN u.Sexo > 0 THEN 1 ELSE 0 END)  as dFemenino,
			SUM(CASE WHEN u.Sexo > 0 THEN 0 ELSE 1 END)  as dMasculino
			FROM Actualizaciones a
		JOIN Usuarios u ON a.idUsuario = u.IDUsuario 
		WHERE a.fechaCreacion BETWEEN '2020-01-01' AND CURDATE()
     		AND a.escrutinio > 3
		GROUP BY fecha
	) t
    JOIN (SELECT @running_total:=0) r1
    JOIN (SELECT @running_total_masculino:=0) r2
    JOIN (SELECT @running_total_femenino:=0) r3
    ORDER BY t.fecha ASC;
END
